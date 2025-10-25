import { Prisma } from "@prisma/client"
import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { NotificationsService } from "../services/notifications.service"
import { EventService } from "../services/events.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: SwapActions
 *   description: Swap request action handling
 */

/**
 * @swagger
 * /action-swap-requests:
 *   post:
 *     summary: Process swap request action (approve/decline)
 *     tags: [SwapActions]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [swap_notif_id, status]
 *             properties:
 *               swap_notif_id: {type: integer, description: Swap notification ID}
 *               status: {type: string, enum: [APPROVED, DECLINED], description: Action to take}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data:
 *                   type: object
 *                   properties:
 *                     updated_notification: {$ref: '#/components/schemas/SwapNotification'}
 *                     swap: {$ref: '#/components/schemas/SwapRequest'}
 *                     send_notification: {$ref: '#/components/schemas/SwapNotification'}
 *                     swapped_event_assignment: {$ref: '#/components/schemas/EventAssignmentUpdateResponse'}
 */
router.post("/", authenticate, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma
    const requestService = new RequestsService(prisma)
    const notificationService = new NotificationsService(prisma)
    const eventService = new EventService(prisma)

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const userId = req.userId
    const { swap_notif_id, status } = req.body
    if (!swap_notif_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "No swap notification id provided in payload",
      })
    }

    const swap_notif = await prisma.swapNotification.findUnique({
      where: { id: swap_notif_id },
      select: { to_user: true },
    })

    if (!swap_notif) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Swap notification id was not found",
      })
    }

    if (req.userId != swap_notif.to_user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error:
          "Only the owner of the swap request notification should be able to update its status",
      })
    }

    // Atomic transation; pass the same transaction client to services
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Mark swap notification as completed
      const swapNotification = await notificationService.updateSwapNotifications(
        { id: swap_notif_id, is_read: true, requires_action: false },
        tx,
      )

      // 2. Change swap request status
      const swapRequest = await requestService.updateSwapRequest(
        { id: swapNotification.swap_request, status },
        tx,
      )

      // 3. Send status update notification
      const swapUpdateNotif = await notificationService.setSwapNotifications(
        userId,
        {
          to_user: swapRequest.from_user,
          swap_id: swapNotification.swap_request,
          requires_action: false,
        },
        tx,
      )

      // Early return if declined
      if (status === "DECLINED") {
        return { swapNotification, swapRequest, swapUpdateNotif }
      }

      // 4. If approved, perform event assignment swap
      const swappedEventAssignment = await eventService.updateEventAssignment(
        {
          from_user: swapRequest.from_user,
          to_user: userId,
          event_id: swapRequest.event_id,
        },
        tx,
      )

      return { swapNotification, swapRequest, swapUpdateNotif, swappedEventAssignment }
    })

    res.json({
      success: true,
      data: {
        updated_notification: result.swapNotification,
        swap: result.swapRequest,
        send_notification: result.swapUpdateNotif,
        swapped_event_assignment: result.swappedEventAssignment,
      },
    })
  } catch (error: any) {
    console.error("Transaction failed:", error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

import { Prisma } from "@prisma/client"
import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { NotificationsService } from "../services/notifications.service"
import { EventService } from "../services/event.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

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
    const swap_notif_id = req.body.swap_notif_id

    if (!swap_notif_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "No swap notification id provided in payload",
      })
    }

    const swap_notif_to_user = await req.app.locals.prisma.swapNotification.findUnique({
      where: {
        id: swap_notif_id,
      },
      select: {
        to_user: true,
      },
    })

    if (!swap_notif_to_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Swap notification id was not gound",
      })
    }

    const toUser = swap_notif_to_user.to_user

    if (req.userId != toUser) {
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
        {
          id: swap_notif_id,
          is_read: true,
          requires_action: false,
        },
        tx,
      )

      // 2. Change the swap request status
      const status = req.body.status
      const swapRequest = await requestService.updateSwapRequest(
        {
          id: swapNotification.swap_request,
          status: status,
        },
        tx,
      )

      // 3. Send swap status update notification to user
      const swapUpdateNotif = await notificationService.setSwapNotifications(
        userId,
        {
          to_user: swapRequest.from_user,
          swap_id: swapNotification.swap_request,
          requires_action: false,
        },
        tx,
      )

      // Early return if the swap request was declined
      const declineSwap = status == "DECLINED"
      if (declineSwap) {
        return { swapNotification, swapRequest, swapUpdateNotif }
      }

      // 4. If the status was updated to approve, perform the event assignment swap
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

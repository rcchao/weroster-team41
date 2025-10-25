import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { NotificationsService } from "../services/notifications.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management endpoints
 */

/**
 * @swagger
 * /notifications/swap:
 *   get:
 *     summary: Get swap notifications for authenticated user
 *     tags: [Notifications]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/SwapNotification'}
 */
router.get("/swap", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const swapNotification = await service.getSwapNotifications(req.userId)
    res.json({ success: true, data: swapNotification })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

/**
 * @swagger
 * /notifications/swap:
 *   post:
 *     summary: Create a new swap notification
 *     tags: [Notifications]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [to_user, swap_id]
 *             properties:
 *               to_user: {type: integer}
 *               swap_id: {type: integer}
 *               requires_action: {type: boolean}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/SwapNotificationPostResponse'}
 */
router.post("/swap", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const { to_user, swap_id } = req.body
    if (!swap_id || !to_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request payload",
      })
    }
    const swapRequest = await service.setSwapNotifications(req.userId, req.body)
    res.json({ success: true, data: swapRequest })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

/**
 * @swagger
 * /notifications/swap/{id}:
 *   patch:
 *     summary: Update swap notification status
 *     tags: [Notifications]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: integer}}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_read: {type: boolean}
 *               requires_action: {type: boolean}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/SwapNotification'}
 */
router.patch("/swap/:id", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const swapNotifId = parseInt(req.params.id)
    const { is_read, requires_action } = req.body

    if (!swapNotifId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request notification update payload",
      })
    }

    const swap_notif = await req.app.locals.prisma.swapNotification.findUnique({
      where: { id: swapNotifId },
      select: { to_user: true },
    })

    if (req.userId != swap_notif?.to_user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error:
          "Only the owner of the swap request notification should be able to update its status",
      })
    }

    const updatedSwapNotif = await service.updateSwapNotifications({
      id: swapNotifId,
      is_read,
      requires_action,
    })
    res.json({ success: true, data: updatedSwapNotif })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

/**
 * @swagger
 * /notifications/leave:
 *   get:
 *     summary: Get leave notifications for authenticated user
 *     tags: [Notifications]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/LeaveNotification'}
 */
router.get("/leave", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const leaveNotification = await service.getLeaveNotifications(req.userId)
    res.json({ success: true, data: leaveNotification })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

/**
 * @swagger
 * /notifications/assignment-request:
 *   get:
 *     summary: Get assignment request notifications
 *     tags: [Notifications]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/AssignmentRequestNotification'}
 */
router.get("/assignment-request", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const assignmentRequestNotification = await service.getAssignmentRequestNotification(req.userId)
    res.json({ success: true, data: assignmentRequestNotification })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

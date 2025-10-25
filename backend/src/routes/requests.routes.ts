import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/events.service"
import { NotificationsService } from "../services/notifications.service"
import { Prisma } from "@prisma/client"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Leave, assignment and swap request management
 */

/**
 * @swagger
 * /requests/leave:
 *   get:
 *     summary: Get leave requests
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: query, name: month, required: false, schema: {type: integer}}
 *       - {in: query, name: year, required: false, schema: {type: integer}}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {type: array, items: {$ref: '#/components/schemas/LeaveRequest'}}
 */
router.get("/leave", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const month = req.query.month ? parseInt(req.query.month as string) : undefined
    const year = req.query.year ? parseInt(req.query.year as string) : undefined
    const leaveRequests = await service.getLeaveRequests(req.userId, month, year)
    res.json({ success: true, data: leaveRequests })
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
 * /requests/assignment:
 *   get:
 *     summary: Get assignment requests
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: query, name: month, required: true, schema: {type: integer}}
 *       - {in: query, name: year, required: true, schema: {type: integer}}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {type: array, items: {$ref: '#/components/schemas/AssignmentRequest'}}
 */
router.get("/assignment", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const month = parseInt(req.query.month as string)
    const year = parseInt(req.query.year as string)
    const assignmentRequests = await service.getAssignmentRequests(req.userId, month, year)
    res.json({ success: true, data: assignmentRequests })
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
 * /requests/assignment:
 *   post:
 *     summary: Create assignment request for open shift
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [event_id]
 *             properties:
 *               event_id: {type: integer}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/AssignmentRequest'}
 */
router.post("/assignment", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    const eventService = new EventService(req.app.locals.prisma)

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const { event_id } = req.body
    if (!event_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid assignment request payload",
      })
    }

    const event = await eventService.getShift(event_id)
    if (!event) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      })
    }
    if (event.numUsers != 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Not an open shift, cannot make assignment request",
      })
    }

    const assignment = await service.setAssignmentRequest(req.userId, req.body)
    res.json({ success: true, data: assignment })
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
 * /requests/swap:
 *   get:
 *     summary: Get swap requests
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: query, name: month, required: true, schema: {type: integer}}
 *       - {in: query, name: year, required: true, schema: {type: integer}}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {type: array, items: {$ref: '#/components/schemas/SwapRequest'}}
 */
router.get("/swap", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const month = parseInt(req.query.month as string)
    const year = parseInt(req.query.year as string)
    const swapRequest = await service.getSwapRequest(req.userId, month, year)
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
 * /requests/swap:
 *   post:
 *     summary: Create swap request with notification
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [to_user, event_id]
 *             properties:
 *               to_user: {type: integer}
 *               event_id: {type: integer}
 *               message: {type: string}
 *               requires_action: {type: boolean}
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
 *                     swap: {$ref: '#/components/schemas/SwapPostResponse'}
 *                     notification: {$ref: '#/components/schemas/SwapNotificationPostResponse'}
 */
router.post("/swap", authenticate, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma
    const requestService = new RequestsService(prisma)
    const eventService = new EventService(prisma)
    const notificationService = new NotificationsService(prisma)

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const { to_user, event_id, message } = req.body
    const from_user = req.userId

    if (!event_id || !to_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request payload",
      })
    }

    const event = await eventService.getShift(event_id)
    if (!event) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      })
    }

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const swapRequest = await requestService.setSwapRequest(
        from_user,
        { to_user, event_id, message },
        tx,
      )
      const notification = await notificationService.setSwapNotifications(
        from_user,
        {
          to_user,
          swap_id: swapRequest.id,
          requires_action: req.body.requires_action ?? true,
        },
        tx,
      )
      return { swapRequest, notification }
    })

    res.json({
      success: true,
      data: {
        swap: result.swapRequest,
        notification: result.notification,
      },
    })
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
 * /requests/swap/{id}:
 *   patch:
 *     summary: Update swap request status
 *     tags: [Requests]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: integer}}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: {type: string, enum: [PENDING, APPROVED, DECLINED]}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/SwapRequest'}
 */
router.patch("/swap/:id", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const swapId = parseInt(req.params.id)
    const { status } = req.body
    if (!swapId || !status) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request update payload",
      })
    }

    const swap = await req.app.locals.prisma.swap.findUnique({
      where: { id: swapId },
      select: { to_user: true },
    })

    if (req.userId != swap?.to_user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "Only the swap request recipient should be able to update the swap request status",
      })
    }

    const updatedSwap = await service.updateSwapRequest({ id: swapId, status })
    res.json({ success: true, data: updatedSwap })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

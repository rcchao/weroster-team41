import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"
import { NotificationsService } from "../services/notifications.service"
import { Prisma } from "@prisma/client"
import { SwapPostResponse } from "../types/requests.types"
import { SwapNotificationPostResponse } from "../types/notifications.types"

const router = Router()

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
    res.json({
      success: true,
      data: leaveRequests,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

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
    res.json({
      success: true,
      data: assignmentRequests,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

router.post("/assignment", authenticate, async (req, res) => {
  try {
    const service = new RequestsService(req.app.locals.prisma)
    const eventService = new EventService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    // Validate event id from request body
    const event_id = req.body.event_id
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

    res.json({
      success: true,
      data: {
        ...assignment,
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
    res.json({
      success: true,
      data: swapRequest,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

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

    // Validate event id from request body
    const event = await eventService.getShift(event_id)
    if (!event) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      })
    }

    // Transaction with services
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Pass transaction to services
      const swapRequest = await requestService.setSwapRequest(
        from_user,
        {
          to_user: to_user,
          event_id: event_id,
          message: message,
        },
        tx,
      )

      const notification = await notificationService.setSwapNotifications(
        from_user,
        {
          to_user: to_user,
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
        swap: result.swapRequest as SwapPostResponse,
        notification: result.notification as SwapNotificationPostResponse,
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

    const swap_to_user = await req.app.locals.prisma.swap.findUnique({
      where: {
        id: swapId,
      },
      select: {
        to_user: true,
      },
    })
    const toUser = swap_to_user.to_user

    if (req.userId != toUser) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "Only the swap request recipient should be able to update the swap request status",
      })
    }

    const updatedSwap = await service.updateSwapRequest({ id: swapId, status })

    res.json({
      success: true,
      data: updatedSwap,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

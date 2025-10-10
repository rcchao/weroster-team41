import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"

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
    const service = new RequestsService(req.app.locals.prisma)
    const eventService = new EventService(req.app.locals.prisma)

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const to_user = req.body.to_user
    const event_id = req.body.event_id

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

    // TODO: Validate to user from request body
    // Add this check when there's an endpoint for getting
    // one user

    const swapRequest = await service.setSwapRequest(req.userId, req.body)
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

export default router

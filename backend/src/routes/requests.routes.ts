import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { RequestsService } from "../services/requests.service"
import { HttpStatus } from "../constants/httpResponse"

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

    const month = parseInt(req.query.month as string)
    const year = parseInt(req.query.year as string)

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

export default router

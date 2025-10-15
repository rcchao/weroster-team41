import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { NotificationsService } from "../services/notifications.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

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
    res.json({
      success: true,
      data: swapNotification,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

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
    res.json({
      success: true,
      data: leaveNotification,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

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
    res.json({
      success: true,
      data: assignmentRequestNotification,
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

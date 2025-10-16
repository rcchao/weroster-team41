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

router.post("/swap", authenticate, async (req, res) => {
  try {
    const service = new NotificationsService(req.app.locals.prisma)

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const to_user = req.body.to_user
    const swap_id = req.body.swap_id
    if (!swap_id || !to_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request payload",
      })
    }

    const swapRequest = await service.setSwapNotifications(req.userId, req.body)
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
    const is_read = req.body.is_read
    const requires_action = req.body.requires_action

    if (!swapNotifId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid swap request notification update payload",
      })
    }

    const swap_notif_to_user = await req.app.locals.prisma.swapNotification.findUnique({
      where: {
        id: swapNotifId,
      },
      select: {
        to_user: true,
      },
    })
    const toUser = swap_notif_to_user.to_user

    if (req.userId != toUser) {
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

    res.json({
      success: true,
      data: updatedSwapNotif,
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

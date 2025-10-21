import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { AuthService } from "../services/auth.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

// Public routes (login)
router.post("/login", async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)
    const result = await service.login(req.body)
    res.json({
      success: true,
      ...result,
    })
  } catch (error: any) {
    const status =
      error.message === "Invalid credentials" ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST

    res.status(status).json({
      success: false,
      error: error.message,
    })
  }
})

// Protected routes with authentication middleware
router.get("/profile/:userId", authenticate, async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)
    const currentUserId = req.userId
    const targetUserId = Number(req.params.userId) // Profile being fetched

    // Ensure user is authenticated
    if (!currentUserId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    if (!Number.isInteger(targetUserId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid user ID",
      })
    }

    // now should take multiple user ids
    const user = await service.getProfile(targetUserId)
    res.json({
      success: true,
      data: {
        ...user,
      },
    })
  } catch (error: any) {
    const status =
      error.message === "User not found" ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR

    res.status(status).json({
      success: false,
      error: error.message,
    })
  }
  return
})

router.patch("/profile", authenticate, async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const user = await service.updateProfile(req.userId, req.body)
    res.json({
      success: true,
      data: {
        ...user,
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

// router.patch("/swap/:id", authenticate, async (req, res) => {
//   try {
//     const service = new NotificationsService(req.app.locals.prisma)

//     const swapNotifId = parseInt(req.params.id)
//     const is_read = req.body.is_read
//     const requires_action = req.body.requires_action

//     const updatedSwapNotif = await service.updateSwapNotifications({
//       id: swapNotifId,
//       is_read,
//       requires_action,
//     })

//     res.json({
//       success: true,
//       data: updatedSwapNotif,
//     })
//   } catch (error: any) {
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       error: error.message,
//     })
//   }
//   return
// })

export default router

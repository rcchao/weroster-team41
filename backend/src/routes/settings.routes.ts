import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { SettingsService } from "../services/settings.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

router.get("/dashboard-preferences", authenticate, async (req, res) => {
  try {
    const service = new SettingsService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const dashboardPreferences = await service.getDashboardPreferences(req.userId)
    res.json({
      success: true,
      data: {
        ...dashboardPreferences,
      },
    })
  } catch (error: any) {
    const status =
      error.message === "dashboardPreferences not found"
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR

    res.status(status).json({
      success: false,
      error: error.message,
    })
  }
  return
})

router.post("/dashboard-preferences", authenticate, async (req, res) => {
  try {
    const service = new SettingsService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    // Validate preferences from request body
    const preferences = req.body
    if (!preferences || typeof preferences !== "object") {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid preferences payload",
      })
    }

    const dashboardPreferences = await service.setDashboardPreferences(req.userId, preferences)
    res.json({
      success: true,
      data: {
        ...dashboardPreferences,
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

export default router

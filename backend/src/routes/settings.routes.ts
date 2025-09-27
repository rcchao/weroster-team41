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
      error.message === "Dashboard Settings not found" //todo: change this to be consistent
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR

    res.status(status).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

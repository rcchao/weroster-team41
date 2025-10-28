import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { SettingsService } from "../services/settings.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: User settings and preferences
 */

/**
 * @swagger
 * /settings/dashboard-preferences:
 *   get:
 *     summary: Get user's dashboard preferences
 *     tags: [Settings]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/DashboardPreferences'}
 */
router.get("/dashboard-preferences", authenticate, async (req, res) => {
  try {
    const service = new SettingsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const dashboardPreferences = await service.getDashboardPreferences(req.userId)
    res.json({ success: true, data: dashboardPreferences })
  } catch (error: any) {
    const status =
      error.message === "dashboardPreferences not found"
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json({ success: false, error: error.message })
  }
  return
})

/**
 * @swagger
 * /settings/dashboard-preferences:
 *   post:
 *     summary: Set user's dashboard preferences
 *     tags: [Settings]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DashboardPreferences'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/DashboardPreferences'}
 */
router.post("/dashboard-preferences", authenticate, async (req, res) => {
  try {
    const service = new SettingsService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const preferences = req.body
    if (!preferences || typeof preferences !== "object") {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid preferences payload",
      })
    }

    const dashboardPreferences = await service.setDashboardPreferences(req.userId, preferences)
    res.json({ success: true, data: dashboardPreferences })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

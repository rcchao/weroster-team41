import { Router } from "express"
import { HttpStatus } from "../constants/httpResponse"
import { authenticate } from "../middleware/auth.middleware"
import { CampusService } from "../services/campus.service"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Campus
 *   description: Campus and location management
 */

/**
 * @swagger
 * /campus/next-shift:
 *   get:
 *     summary: Get upcoming campus events for user
 *     tags: [Campus]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {type: array, items: {$ref: '#/components/schemas/CampusEvent'}}
 */
router.get("/next-shift", authenticate, async (req, res) => {
  try {
    const service = new CampusService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const upcomingCampusEvents = await service.getUpcomingCampusEvents(req.userId)
    res.json({ success: true, data: upcomingCampusEvents })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

/**
 * @swagger
 * /campus/{locationId}:
 *   get:
 *     summary: Get campus information by location ID
 *     tags: [Campus]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: locationId, required: true, schema: {type: integer}}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/Campus'}
 */
router.get("/:locationId", authenticate, async (req, res) => {
  try {
    const service = new CampusService(req.app.locals.prisma)
    const locationId = Number(req.params.locationId)

    if (!Number.isInteger(locationId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid location ID",
      })
    }

    const campus = await service.getCampus(locationId)
    if (!campus) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: "Campus not found",
      })
    }

    res.json({ success: true, data: campus })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

export default router

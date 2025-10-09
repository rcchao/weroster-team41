import { Router } from "express"

import { HttpStatus } from "../constants/httpResponse"
import { authenticate } from "../middleware/auth.middleware"
import { CampusService } from "../services/campus.service"

const router = Router()

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
    res.json({
      success: true,
      data: upcomingCampusEvents,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

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

    res.json({
      success: true,
      data: campus,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

export default router

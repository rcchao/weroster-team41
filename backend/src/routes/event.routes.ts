import { Router } from "express"

import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"
import { authenticate } from "../middleware/auth.middleware"
import { Session } from "@prisma/client"

const router = Router()
router.get("/my-shifts", authenticate, async (req, res) => {
  try {
    const service = new EventService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const shifts = await service.getMyShifts(req.userId)

    res.json({
      success: true,
      data: shifts,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

router.get("/open-shifts", authenticate, async (req, res) => {
  try {
    const service = new EventService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userId || !req.userHospitalId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated or Hospital unknown",
      })
    }

    const openShifts = await service.getOpenShifts(req.userId, req.userHospitalId)

    res.json({
      success: true,
      data: openShifts,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

router.get("/team-shifts", authenticate, async (req, res) => {
  try {
    const day = parseInt(req.query.day as string)
    const month = parseInt(req.query.month as string)
    const year = parseInt(req.query.year as string)
    const session = req.query.session as Session

    const service = new EventService(req.app.locals.prisma)

    // Ensure user is authenticated
    if (!req.userHospitalId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User does not belong to a hospital",
      })
    }

    const shifts = await service.getTeamShifts(req.userHospitalId, day, month, year, session)

    res.json({
      success: true,
      data: shifts,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

router.get("/:shiftId", authenticate, async (req, res) => {
  try {
    const service = new EventService(req.app.locals.prisma)
    const shiftId = Number(req.params.shiftId)

    if (!Number.isInteger(shiftId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid shift ID",
      })
    }

    const shift = await service.getShift(shiftId)

    if (!shift) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: "Shift not found",
      })
    }

    res.json({
      success: true,
      data: shift,
    })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
  return
})

export default router

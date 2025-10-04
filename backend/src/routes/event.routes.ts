import { Router } from "express"
// import { MMKV } from "react-native-mmkv"

import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"
import { authenticate } from "../middleware/auth.middleware"
import { Session } from "@prisma/client"

const router = Router()
// const storage = new MMKV()

// Post = Create a new event at the endpoint /api/events
router.post("/", async (req, res) => {
  try {
    // Use EventService to handle "business logic"
    const service = new EventService(req.app.locals.prisma)
    const event = await service.create(req.body)
    res.status(HttpStatus.CREATED).json(event)
  } catch (error: any) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
  }
})

// Get = Retrieve events for a specific activity at the endpoint /api/events/activity/:activityId/events
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

router.get("/team-shifts", authenticate, async (req, res) => {
  try {
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

    const shifts = await service.getTeamShifts(req.userHospitalId, month, year, session)

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

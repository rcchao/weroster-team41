import { Router } from "express"

import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

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

export default router

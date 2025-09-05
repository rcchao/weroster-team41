import { Router } from "express"

import { HttpStatus } from "../constants/httpResponse"
import { EventService } from "../services/event.service"

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
router.get("/activity/:activityId/events", async (req, res) => {
  try {
    const service = new EventService(req.app.locals.prisma)
    const events = await service.getActivityEvents(req.params.activityId)
    res.json(events)
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

export default router

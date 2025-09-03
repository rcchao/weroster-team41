import { Router } from "express"

import eventRoutes from "./event.routes"

const router = Router()

// Expose API routes under /api
router.use("/events", eventRoutes)

export default router

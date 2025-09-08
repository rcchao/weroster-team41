import { Router } from "express"

import eventRoutes from "./event.routes"
import authRoutes from "./auth.routes"

const router = Router()

// Expose API routes under /api
router.use("/auth", authRoutes)
router.use("/events", eventRoutes)

export default router

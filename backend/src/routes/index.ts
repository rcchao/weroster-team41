import { Router } from "express"

import eventRoutes from "./event.routes"
import authRoutes from "./auth.routes"
import settingsRoutes from "./settings.routes"
import requestsRoutes from "./requests.routes"

const router = Router()

// Expose API routes under /api
router.use("/auth", authRoutes)
router.use("/events", eventRoutes)
router.use("/settings", settingsRoutes)
router.use("/requests", requestsRoutes)

export default router

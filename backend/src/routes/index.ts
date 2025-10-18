import { Router } from "express"

import eventRoutes from "./event.routes"
import authRoutes from "./auth.routes"
import settingsRoutes from "./settings.routes"
import requestsRoutes from "./requests.routes"
import userRoutes from "./users.routes"
import campusRoutes from "./campus.routes"
import notificationsRoutes from "./notifications.routes"
import actionSwapRequestRoutes from "./action_swap_request.routes"

const router = Router()

// Expose API routes under /api
router.use("/auth", authRoutes)
router.use("/events", eventRoutes)
router.use("/settings", settingsRoutes)
router.use("/requests", requestsRoutes)
router.use("/user", userRoutes)
router.use("/campus", campusRoutes)
router.use("/notifications", notificationsRoutes)
router.use("/action-swap-request", actionSwapRequestRoutes)

export default router

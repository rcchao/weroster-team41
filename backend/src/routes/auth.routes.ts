import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { AuthService } from "../services/auth.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user profile management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string, format: password}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 token: {type: string}
 *                 user: {$ref: '#/components/schemas/User'}
 */
router.post("/login", async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)
    const result = await service.login(req.body)
    res.json({ success: true, ...result })
  } catch (error: any) {
    const status =
      error.message === "Invalid credentials" ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST
    res.status(status).json({ success: false, error: error.message })
  }
})

/**
 * @swagger
 * /auth/profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Auth]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: userId, required: true, schema: {type: integer}}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/UserProfile'}
 */
router.get("/profile/:userId", authenticate, async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }

    const targetUserId = Number(req.params.userId)
    if (!Number.isInteger(targetUserId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Invalid user ID",
      })
    }

    const user = await service.getProfile(targetUserId)
    res.json({ success: true, data: user })
  } catch (error: any) {
    const status =
      error.message === "User not found" ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json({ success: false, error: error.message })
  }
  return
})

/**
 * @swagger
 * /auth/profile:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Auth]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: {type: string}
 *               last_name: {type: string}
 *               email: {type: string, format: email}
 *               phone: {type: string}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {$ref: '#/components/schemas/UserProfile'}
 */
router.patch("/profile", authenticate, async (req, res) => {
  try {
    const service = new AuthService(req.app.locals.prisma)
    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "User not authenticated",
      })
    }
    const user = await service.updateProfile(req.userId, req.body)
    res.json({ success: true, data: user })
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    })
  }
  return
})

export default router

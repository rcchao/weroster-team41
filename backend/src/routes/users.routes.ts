import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { UserService } from "../services/users.service"
import { HttpStatus } from "../constants/httpResponse"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User and team management
 */

/**
 * @swagger
 * /user/team:
 *   get:
 *     summary: Get team member data for user's hospital
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success: {type: boolean}
 *                 data: {type: array, items: {$ref: '#/components/schemas/TeamMemberData'}}
 */
router.get("/team", authenticate, async (req, res) => {
  try {
    const service = new UserService(req.app.locals.prisma)
    if (!req.userHospitalId || !req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: `User Id ${req.userId} not found or user hospital Id not found ${req.userHospitalId}`,
      })
    }
    const teamMemberData = await service.getTeamMemberData(req.userId, req.userHospitalId)
    res.json({ success: true, data: teamMemberData })
  } catch (error: any) {
    const status =
      error.message === "teamMemberData not found"
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json({ success: false, error: error.message })
  }
  return
})

export default router

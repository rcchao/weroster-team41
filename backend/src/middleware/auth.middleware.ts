import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from ".prisma/client"
import { HttpStatus } from "../constants/httpResponse"

// Extend Express Request interface to include user info
declare module "express-serve-static-core" {
  interface Request {
    userId?: number
    userEmail?: string
    user?: User
    userHospitalId?: number
  }
}

interface JWTPayload {
  userId: number
  email: string
  userHospitalId: number
}

// Authentication middleware to verify JWT tokens and attach user info to the request object
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: "No token provided" })
      return
    }

    // Split "Bearer <token>"
    const parts = authHeader.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: "Malformed token" })
      return
    }

    const token = parts[1]

    try {
      // Decode and verify existing JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload

      // Attach user info to request object for downstream handlers
      req.userId = decoded.userId
      req.userEmail = decoded.email
      req.userHospitalId = decoded.userHospitalId

      // next() call passes control to the next function in the route handler chain
      next()
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: "Invalid or expired token" })
      return
    }
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Authentication error" })
  }
}

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
  }
}

interface JWTPayload {
  userId: number
  email: string
}

// Authentication middleware to verify JWT tokens and attach user info to the request object
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: "No token provided" })
      return
    }

    const token = authHeader.substring(7)

    try {
      // Decode and verify existing JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload

      // Attach user info to request object for downstream handlers
      req.userId = decoded.userId
      req.userEmail = decoded.email

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

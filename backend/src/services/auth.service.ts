import { PrismaClient } from "@prisma/client"
import type { User } from ".prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthResult, LoginRequest, UpdateProfileData } from "../types/auth.types"

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  // Helper function to generate token
  private generateToken(user: Partial<User>): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userHospitalId: user.hospital_id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" },
    )
  }

  // Helper to remove password from user object
  private sanitizeUser<T extends { password?: string }>(user: T): Omit<T, "password"> {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async login(data: LoginRequest): Promise<AuthResult> {
    // Validation
    if (!data.email || !data.password) {
      throw new Error("Email and password are required")
    }

    // Find user with relations
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: {
        campus: true,
        hospital: true,
        designation: true,
      },
    })

    if (!user || !user.password) {
      throw new Error("Invalid credentials")
    }

    // Check password
    const validPassword = await bcrypt.compare(data.password, user.password)

    if (!validPassword) {
      throw new Error("Invalid credentials")
    }

    // Generate token and return
    const token = this.generateToken(user)
    return {
      token,
      user: this.sanitizeUser(user),
    }
  }

  async getProfile(userId: number): Promise<Omit<User, "password">> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        campus: true,
        hospital: true,
        designation: true,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    return this.sanitizeUser(user)
  }

  async updateProfile(userId: number, data: UpdateProfileData): Promise<Omit<User, "password">> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.first_name !== undefined && { first_name: data.first_name }),
        ...(data.last_name !== undefined && { last_name: data.last_name }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.designation_id !== undefined && { designation_id: data.designation_id }),
        ...(data.campus_id !== undefined && { campus_id: data.campus_id }),
        ...(data.hospital_id !== undefined && { hospital_id: data.hospital_id }),
      },
      include: {
        campus: true,
        hospital: true,
        designation: true,
      },
    })

    return this.sanitizeUser(user)
  }
}

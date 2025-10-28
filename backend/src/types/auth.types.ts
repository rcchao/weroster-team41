import type { Prisma } from ".prisma/client"

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResult {
  token: string
  user: ProfileData
}

export type ProfileData = Prisma.UserGetPayload<{
  select: {
    id: true
    email: true
    first_name: true
    last_name: true
    phone: true
    role: true
    designation: {
      select: {
        id: true
        title: true
        description: true
      }
    }
  }
}>

export interface UpdateProfileData {
  first_name?: string
  last_name?: string
  phone?: string
}

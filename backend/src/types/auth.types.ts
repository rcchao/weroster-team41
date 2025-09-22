import type { Prisma, User } from ".prisma/client"

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResult {
  token: string
  user: Omit<User, "password">
}

export type ProfileData = Prisma.UserGetPayload<{
  select: {
    id: true
    email: true
    first_name: true
    last_name: true
    phone: true
    role: true
    campus: {
      select: {
        id: true
        name: true
        hospital_id: true
      }
    }
    hospital: {
      select: {
        id: true
        name: true
        address: true
      }
    }
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
  designation_id?: number
  campus_id?: number
  hospital_id?: number
}

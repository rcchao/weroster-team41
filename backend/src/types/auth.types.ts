import type { User } from ".prisma/client"

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResult {
  token: string
  user: Omit<User, "password">
}

export interface UpdateProfileData {
  first_name?: string
  last_name?: string
  phone?: string
  designation_id?: number
  campus_id?: number
  hospital_id?: number
}

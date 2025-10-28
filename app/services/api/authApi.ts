import { MMKV } from "react-native-mmkv"

import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { ProfileData, UpdateProfileData } from "../../../backend/src/types/auth.types"

const storage = new MMKV()

interface User {
  id: number
  email: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  role?: string | null
  hospital_id: number
  campus_id: number
  designation_id: number
  campus?: any
  hospital?: any
  designation?: any
}

interface AuthResponse {
  token: string
  user: User
}

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", { email, password })
    if (response.ok && response.data) {
      storage.set("authToken", response.data.token)
      storage.set("userEmail", email)
      storage.set("userId", response.data.user.id)
      storage.set("userHospitalId", response.data.user.hospital_id)

      return { success: true, data: response.data }
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Login failed",
    }
  },

  getProfile: async (userId: number) => {
    const response = await api.get<ApiResponse<ProfileData>>(`/auth/profile/${userId}`)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve profile",
    } as ApiResponse<ProfileData>
  },

  updateProfile: async (profileUpdate: UpdateProfileData) => {
    const response = await api.patch<ApiResponse<ProfileData>>(`/auth/profile`, profileUpdate)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update profile",
    } as ApiResponse<ProfileData>
  },

  logout: () => {
    storage.delete("authToken")
    storage.delete("userEmail")
    storage.delete("userId")
    storage.delete("userHospitalId")
  },
}

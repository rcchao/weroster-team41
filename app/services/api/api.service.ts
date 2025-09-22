import { Platform } from "react-native"
import { create } from "apisauce"
import { MMKV } from "react-native-mmkv"

import { ApiResponse } from "../../../backend/src/types/api.types"
import { ProfileData } from "../../../backend/src/types/auth.types"

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

const getBaseURL = () => {
  // Use environment variable if available (for production or staging)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL
  }

  // Otherwise, use platform-specific URLs
  return Platform.select({
    ios: "http://localhost:3000/api",
    android: "http://10.0.2.2:3000/api",
    default: "http://localhost:3000/api",
  })
}

const api = create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.addAsyncRequestTransform(async (request) => {
  const token = storage.getString("authToken")
  if (token && request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`
  }
})

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

  getProfile: async () => {
    const response = await api.get<ApiResponse<ProfileData>>("/auth/profile")
    console.log("\n\n[authApi.getProfile] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve profile",
    } as ApiResponse<ProfileData>
  },

  logout: () => {
    storage.delete("authToken")
    storage.delete("userEmail")
    storage.delete("userId")
    storage.delete("userHospitalId")
  },
}

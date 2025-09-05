import { create } from "apisauce"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

interface User {
  id: number
  email: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  role?: string | null
  Campus?: any
  Hospital?: any
  Designation?: any
}

interface AuthResponse {
  token: string
  user: User
}

const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
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
      return { success: true, data: response.data }
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Login failed",
    }
  },

  getProfile: async () => {
    const response = await api.get<User>("/auth/profile")
    return response.ok ? response.data : null
  },

  logout: () => {
    storage.delete("authToken")
    storage.delete("userEmail")
  },
}

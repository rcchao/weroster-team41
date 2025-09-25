import { Platform } from "react-native"
import { create } from "apisauce"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

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

export { api }

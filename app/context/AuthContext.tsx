import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import { MMKV } from "react-native-mmkv"

import { authApi } from "../services/api/authApi"

const storage = new MMKV()

export type AuthContextType = {
  isAuthenticated: boolean
  authToken: string | undefined
  authEmail: string | undefined
  userId: number | undefined
  userHospitalId: number | undefined
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(storage.getString("authToken"))
  const [authEmail, setAuthEmail] = useState<string | undefined>(storage.getString("userEmail"))
  const [userId, setUserId] = useState<number | undefined>(storage.getNumber("userId"))
  const [userHospitalId, setUserHospitalId] = useState<number | undefined>(
    storage.getNumber("userHospitalId"),
  )
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)

    const result = await authApi.login(email, password)

    if (result.success) {
      setAuthToken(result.data?.token)
      setAuthEmail(email)
      setUserId(result.data?.user.id)
      setUserHospitalId(result.data?.user.hospital_id)
      return true
    } else {
      setError(result.error)
      return false
    }
  }

  const logout = () => {
    authApi.logout()
    setAuthToken(undefined)
    setAuthEmail(undefined)
    setUserId(undefined)
    setUserHospitalId(undefined)
    setError(null)
  }

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
    userId,
    userHospitalId,
    error,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export function useAuthenticatedUserId() {
  const { userId } = useAuth()
  if (userId === undefined) throw new Error("User must be authenticated")
  return userId
}

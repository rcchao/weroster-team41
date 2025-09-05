import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import { MMKV } from "react-native-mmkv"

import { authApi } from "../../backend/src/services/api.service"

const storage = new MMKV()

export type AuthContextType = {
  isAuthenticated: boolean
  authToken: string | undefined
  authEmail: string | undefined
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(storage.getString("authToken"))
  const [authEmail, setAuthEmail] = useState<string | undefined>(storage.getString("userEmail"))
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)

    const result = await authApi.login(email, password)

    if (result.success) {
      setAuthToken(result.data?.token)
      setAuthEmail(email)
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
    setError(null)
  }

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
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

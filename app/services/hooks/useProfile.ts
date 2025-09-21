import { useState, useEffect } from "react"

import { ProfileData } from "backend/src/types/auth.types"

import { authApi } from "../api/authApi"

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)

    const result = await authApi.getProfile()

    if (result.success && result.data) {
      setProfile(result.data)
    } else {
      setError(result.error || "Failed to fetch profile")
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!profile) {
      fetchProfile()
    }
  }, [])

  return { profile, loading, error, refetch: fetchProfile }
}

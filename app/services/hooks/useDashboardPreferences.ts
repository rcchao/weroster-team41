import { useState, useEffect } from "react"

import { DashboardPreferences } from "backend/src/types/settings.types"

import { settingsApi } from "../api/settingsApi"

export const useDashboardPreferences = () => {
  const [dashboardPreferences, setDashboardPreferences] = useState<DashboardPreferences | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardPreferences = async () => {
    setLoading(true)
    setError(null)

    const result = await settingsApi.getDashboardPreferences()

    if (result.success && result.data) {
      setDashboardPreferences(result.data)
    } else {
      setError(result.error || "Failed to fetch dashboard settings")
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!dashboardPreferences) {
      fetchDashboardPreferences()
    }
  }, [])

  return { dashboardPreferences, loading, error, refetch: fetchDashboardPreferences }
}

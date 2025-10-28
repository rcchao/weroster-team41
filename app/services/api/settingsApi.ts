import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { DashboardPreferences } from "../../../backend/src/types/settings.types"

export const settingsApi = {
  getDashboardPreferences: async () => {
    const response = await api.get<ApiResponse<DashboardPreferences>>(
      "/settings/dashboard-preferences",
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve dashboard preferences",
    } as ApiResponse<DashboardPreferences>
  },
  setDashboardPreferences: async (
    preferences: DashboardPreferences,
  ): Promise<ApiResponse<DashboardPreferences>> => {
    const response = await api.post<ApiResponse<DashboardPreferences>>(
      "/settings/dashboard-preferences",
      preferences,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to post dashboard preferences",
    } as ApiResponse<DashboardPreferences>
  },
}

import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { Campus, UpcomingCampusEvent } from "../../../backend/src/types/campus.types"

export const campusApi = {
  getUpcomingCampusEvents: async () => {
    const response = await api.get<ApiResponse<UpcomingCampusEvent[]>>(`/campus/next-shift`)
    console.log("\n\n[campusApi.getUpcomingCampusEvents] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve upcoming campus events",
    } as ApiResponse<UpcomingCampusEvent[]>
  },

  getCampusByLocationId: async (locationId: number) => {
    const response = await api.get<ApiResponse<Campus>>(`/campus/${locationId}`)
    console.log("\n\n[campusApi.getCampusByLocationId] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve campus",
    } as ApiResponse<Campus>
  },
}

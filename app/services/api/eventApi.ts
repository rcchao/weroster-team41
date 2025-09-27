import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { EventData } from "../../../backend/src/types/event.types"

export const eventApi = {
  getMyEvents: async () => {
    const response = await api.get<ApiResponse<EventData[]>>("/events/")
    console.log("\n\n[eventApi.getMyEvents] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve events",
    } as ApiResponse<EventData[]>
  },
}
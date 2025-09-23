import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { ShiftDetails } from "../../../backend/src/types/event.types"

export const eventApi = {
  getMyShifts: async () => {
    const response = await api.get<ApiResponse<ShiftDetails[]>>("/events/my-shifts")
    console.log("\n\n[eventApi.getMyShifts] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve events",
    } as ApiResponse<ShiftDetails[]>
  },
}

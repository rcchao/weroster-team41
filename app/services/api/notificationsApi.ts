import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { SwapNotification } from "../../../backend/src/types/notifications.types"

export const notificationsApi = {
  getSwapNotifications: async () => {
    const response = await api.get<ApiResponse<SwapNotification[]>>("/notifications/swap")
    console.log(
      "\n\n[notificationsApi.getSwapNotifications] response:",
      JSON.stringify(response.data),
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve team member data",
    } as ApiResponse<SwapNotification[]>
  },
}

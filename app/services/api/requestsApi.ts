import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { Leave } from "../../../backend/src/types/requests.types"

export const requestsApi = {
  getLeaveRequests: async () => {
    const response = await api.get<ApiResponse<Leave[]>>("/requests/leave")
    console.log("\n\n[requestsApi.getLeaveRequests] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve leave requests",
    } as ApiResponse<Leave[]>
  },
}

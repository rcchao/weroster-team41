import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { Leave, Assignment, Swap } from "../../../backend/src/types/requests.types"

export const requestsApi = {
  getLeaveRequests: async (month: number, year: number) => {
    const response = await api.get<ApiResponse<Leave[]>>(
      `/requests/leave?month=${month}&year=${year}`,
    )
    console.log("\n\n[requestsApi.getLeaveRequests] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve leave requests",
    } as ApiResponse<Leave[]>
  },

  getAssignmentRequests: async (month: number, year: number) => {
    const response = await api.get<ApiResponse<Assignment[]>>(
      `/requests/assignment?month=${month}&year=${year}`,
    )
    console.log("\n\n[requestsApi.getAssignmentRequests] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve assignment requests",
    } as ApiResponse<Assignment[]>
  },

  getSwapRequests: async (month: number, year: number) => {
    const response = await api.get<ApiResponse<Swap[]>>(
      `/requests/swap?month=${month}&year=${year}`,
    )
    console.log("\n\n[requestsApi.getSwapRequests] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve swap requests",
    } as ApiResponse<Swap[]>
  },
}

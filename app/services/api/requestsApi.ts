import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import {
  Leave,
  Assignment,
  AssignmentRequestPayload,
  AssignmentPostResponse,
  Swap,
  SwapRequestPayload,
  SwapPostResponse,
  SwapUpdatePayload,
  SwapWithNotificationPostResponse,
} from "../../../backend/src/types/requests.types"

export const requestsApi = {
  getLeaveRequests: async (month?: number, year?: number) => {
    const params = new URLSearchParams()
    if (month !== undefined) params.append("month", month.toString())
    if (year !== undefined) params.append("year", year.toString())

    const queryString = params.toString()
    const url = `/requests/leave${queryString ? `?${queryString}` : ""}`

    const response = await api.get<ApiResponse<Leave[]>>(url)
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
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve assignment requests",
    } as ApiResponse<Assignment[]>
  },

  setAssignmentRequests: async (assignmentRequest: AssignmentRequestPayload) => {
    const response = await api.post<ApiResponse<AssignmentPostResponse>>(
      `/requests/assignment`,
      assignmentRequest,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to post assignment requests",
    } as ApiResponse<AssignmentPostResponse>
  },

  getSwapRequests: async (month: number, year: number) => {
    const response = await api.get<ApiResponse<Swap[]>>(
      `/requests/swap?month=${month}&year=${year}`,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve swap requests",
    } as ApiResponse<Swap[]>
  },

  setSwapRequests: async (swapRequest: SwapRequestPayload) => {
    const response = await api.post<ApiResponse<SwapWithNotificationPostResponse>>(
      `/requests/swap`,
      swapRequest,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to post swap requests",
    } as ApiResponse<SwapWithNotificationPostResponse>
  },

  updateSwapRequests: async (swapRequestUpdate: SwapUpdatePayload) => {
    const response = await api.patch<ApiResponse<SwapPostResponse>>(
      `/requests/swap/${swapRequestUpdate.id}`,
      swapRequestUpdate,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update swap requests",
    } as ApiResponse<SwapUpdatePayload>
  },
}

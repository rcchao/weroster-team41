import { api } from "./apiClient"
import {
  SwapNotificationActionPayload,
  SwapNotificationActionResponsePayload,
} from "../../../backend/src/types/action_swap_requests.types"
import { ApiResponse } from "../../../backend/src/types/api.types"
import {
  SwapNotification,
  SwapNotificationPayload,
  SwapNotificationPostResponse,
  LeaveNotification,
  AssignmentRequestNotification,
  SwapNotificationUpdatePayload,
} from "../../../backend/src/types/notifications.types"

export const notificationsApi = {
  getSwapNotifications: async () => {
    const response = await api.get<ApiResponse<SwapNotification[]>>("/notifications/swap")
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve swap notifications",
    } as ApiResponse<SwapNotification[]>
  },
  getLeaveNotifications: async () => {
    const response = await api.get<ApiResponse<LeaveNotification[]>>("/notifications/leave")
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve leave notifications",
    } as ApiResponse<LeaveNotification[]>
  },
  getAssignmentRequestNotifications: async () => {
    const response = await api.get<ApiResponse<AssignmentRequestNotification[]>>(
      "/notifications/assignment-request",
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve assignment request notifications",
    } as ApiResponse<AssignmentRequestNotification[]>
  },

  setSwapNotifications: async (assignmentRequest: SwapNotificationPayload) => {
    const response = await api.post<ApiResponse<SwapNotificationPayload>>(
      `/notifications/swap`,
      assignmentRequest,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to post swap notification",
    } as ApiResponse<SwapNotificationPostResponse>
  },

  updateSwapNotifications: async (swapRequestUpdate: SwapNotificationUpdatePayload) => {
    const response = await api.patch<ApiResponse<SwapNotificationUpdatePayload>>(
      `/notifications/swap/${swapRequestUpdate.id}`,
      swapRequestUpdate,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update swap requests",
    } as ApiResponse<SwapNotificationUpdatePayload>
  },

  actionSwapNotifications: async (swapNotificationAction: SwapNotificationActionPayload) => {
    const response = await api.post<ApiResponse<SwapNotificationActionResponsePayload>>(
      `/action-swap-request`,
      swapNotificationAction,
    )
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update swap notification",
    } as ApiResponse<SwapNotificationActionResponsePayload>
  },
}

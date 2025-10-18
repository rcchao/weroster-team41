import { api } from "./apiClient"
import {
  SwapNotificationActionPayload,
  SwapNotificationActionResponsePayload,
} from "../../../backend/src/types/action_swap_request.types"
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
    console.log(
      "\n\n[notificationsApi.getSwapNotifications] response:",
      JSON.stringify(response.data),
    )
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
    console.log(
      "\n\n[notificationsApi.getLeaveNotifications] response:",
      JSON.stringify(response.data),
    )
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
    console.log(
      "\n\n[notificationsApi.getAssignmentRequestNotifications] response:",
      JSON.stringify(response.data),
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
    console.log("\n\n[notificationsApi.setSwapNotifications] response:", response.data)
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
    console.log("\n\n[notificationsApi.updateSwapNotifications] response:", response.data)
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
    console.log("\n\n[notificationsApi.actionSwapNotifications] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update swap notification",
    } as ApiResponse<SwapNotificationActionResponsePayload>
  },
}

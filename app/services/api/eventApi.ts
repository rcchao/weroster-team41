import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import {
  EventAssignmentUpdatePayload,
  EventAssignmentUpdateResponse,
  OpenShift,
  ShiftWithNumUsers,
  TeamShift,
} from "../../../backend/src/types/event.types"

export const eventApi = {
  getMyShifts: async () => {
    const response = await api.get<ApiResponse<ShiftWithNumUsers[]>>("/events/my-shifts")
    console.log("\n\n[eventApi.getMyShifts] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve events",
    } as ApiResponse<ShiftWithNumUsers[]>
  },

  getOpenShifts: async () => {
    const response = await api.get<ApiResponse<OpenShift[]>>("/events/open-shifts")
    console.log("\n\n[eventApi.getOpenShifts] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve events",
    } as ApiResponse<OpenShift[]>
  },

  getShiftById: async (shiftId: number) => {
    const response = await api.get<ApiResponse<ShiftWithNumUsers>>(`/events/${shiftId}`)
    console.log("\n\n[eventApi.getShiftById] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve event",
    } as ApiResponse<ShiftWithNumUsers>
  },

  getTeamShifts: async (day: number, month: number, year: number, session: string) => {
    const response = await api.get<ApiResponse<TeamShift[]>>(
      `/events/team-shifts?day=${day}&month=${month}&year=${year}&session=${session}`,
    )
    console.log("\n\n[eventApi.getTeamShifts] response:", response.data)

    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve team shifts",
    } as ApiResponse<TeamShift[]>
  },

  updateEventAssignment: async (eventAssignmentUpdate: EventAssignmentUpdatePayload) => {
    const response = await api.patch<ApiResponse<EventAssignmentUpdateResponse>>(
      `/events/event-assignment/${eventAssignmentUpdate.event_id}`,
      eventAssignmentUpdate,
    )
    console.log("\n\n[eventsApi.updateEventAssignment] response:", response.data)
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to update swap requests",
    } as ApiResponse<EventAssignmentUpdateResponse>
  },
}

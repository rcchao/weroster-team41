import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { compareDesc } from "date-fns"

import { notificationsApi } from "../api/notificationsApi"

export const useUserNotifications = () => {
  const {
    data: userNotifications,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["user-notifications"],
    queryFn: async () => {
      const [AssignmentReqNotifs, swapNotifs, LeaveNotifs] = await Promise.all([
        notificationsApi.getAssignmentRequestNotifications(),
        notificationsApi.getSwapNotifications(),
        notificationsApi.getLeaveNotifications(),
      ])
      // If any request failed, throw an error to fail the whole query
      if (!swapNotifs.success || !LeaveNotifs.success || !AssignmentReqNotifs.success) {
        throw new Error(
          swapNotifs.error ||
            LeaveNotifs.error ||
            AssignmentReqNotifs.error ||
            "Failed to fetch requests",
        )
      }

      // Unnest assignments and add type
      const assignments =
        AssignmentReqNotifs.data?.map(({ assignmentRequest, ...rest }) => ({
          notif_type: "ASSIGNMENT" as const,
          assignment_request_id: assignmentRequest?.id,
          status: assignmentRequest?.status,
          assignmentRequest_start_date: assignmentRequest?.event?.start_time,
          assignmentRequest_end_date: assignmentRequest?.event?.end_time,
          location: assignmentRequest?.event?.location?.name,
          activity: assignmentRequest?.event?.activity?.name,
          ...rest,
        })) || []

      // Unnest swaps and add type
      const swaps =
        swapNotifs.data?.map(({ swap, fromUser, ...rest }) => ({
          notif_type: "SWAP" as const,
          swap_id: swap?.id,
          message: swap?.message,
          status: swap?.status,
          event: swap?.event,
          swap_initiator: swap?.from_user,
          ...fromUser,
          ...rest,
        })) || []

      // Add type to leave requests
      const leaves =
        LeaveNotifs.data?.map(({ leave, ...rest }) => ({
          notif_type: "LEAVE" as const,
          leave_id: leave?.id,
          leave_start_date: leave?.start_date,
          leave_end_date: leave?.end_date,
          status: leave?.status,
          leave_type: leave?.leaveType,
          ...rest,
        })) || []

      // Combine all arrays into a single flat array
      return [...assignments, ...swaps, ...leaves].sort((a, b) =>
        compareDesc(a.created_at, b.created_at),
      )
    },
    refetchOnMount: true,
  })

  return { userNotifications, error, isPending, isFetching }
}

export function usePostSwapNotification() {
  return useMutation({
    mutationFn: notificationsApi.setSwapNotifications,
  })
}

export function useUpdateSwapNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsApi.updateSwapNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] })
    },
  })
}

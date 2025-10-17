import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { compareAsc } from "date-fns"

import { requestsApi } from "../api/requestsApi"

export const useUserRequests = (month: number, year: number) => {
  const {
    data: userRequests,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["user-requests", month, year],
    queryFn: async () => {
      const [leaveRes, assignmentRes, swapRes] = await Promise.all([
        requestsApi.getLeaveRequests(month, year),
        requestsApi.getAssignmentRequests(month, year),
        requestsApi.getSwapRequests(month, year),
      ])
      // If any request failed, throw an error to fail the whole query
      if (!leaveRes.success || !assignmentRes.success || !swapRes.success) {
        throw new Error(
          leaveRes.error || assignmentRes.error || swapRes.error || "Failed to fetch requests",
        )
      }

      // Unnest assignments and add type
      const assignments =
        assignmentRes.data?.map(({ event, ...rest }) => ({
          type: "ASSIGNMENT",
          ...rest,
          event_id: event?.id,
          start_date: event?.start_time,
          end_date: event?.end_time,
        })) || []

      // Unnest swaps and add type
      const swaps =
        swapRes.data?.map(({ event, ...rest }) => ({
          type: "SWAP",
          ...rest,
          event_id: event?.id,
          start_date: event?.start_time,
          end_date: event?.end_time,
        })) || []

      // Add type to leave requests
      const leave =
        leaveRes.data?.map((item) => ({
          type: "LEAVE",
          ...item,
        })) || []

      // Combine all arrays into a single flat array
      return [...assignments, ...swaps, ...leave].sort((a, b) =>
        compareAsc(a.start_date, b.start_date),
      )
    },
    refetchOnMount: true,
  })

  return { userRequests, error, isPending, isFetching }
}

export const useLeaveRequests = () => {
  const {
    data: leaveRequests,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["leave-requests"],
    queryFn: () => requestsApi.getLeaveRequests(),
    select: (result) => result.data,
    refetchOnMount: true,
  })

  return { leaveRequests, error, isPending, isFetching }
}

export function usePostAssignmentRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestsApi.setAssignmentRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-requests"] })
      queryClient.invalidateQueries({ queryKey: ["open-shifts"] })
    },
  })
}

export function usePostSwapRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestsApi.setSwapRequests,
    onSuccess: () => {
      // This should be the from_user's swap requests
      queryClient.invalidateQueries({ queryKey: ["user-requests"] })
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] })
    },
  })
}

export function useUpdateSwapRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestsApi.updateSwapRequests,
    onSuccess: () => {
      // This should be the from_user's swap requests
      queryClient.invalidateQueries({ queryKey: ["user-requests"] })
    },
  })
}

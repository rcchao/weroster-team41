import { useQuery } from "@tanstack/react-query"

import { requestsApi } from "../api/requestsApi"

export const useUserRequests = () => {
  const {
    data: userRequests,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["user-requests"],
    queryFn: async () => {
      const [leaveRes, assignmentRes, swapRes] = await Promise.all([
        requestsApi.getLeaveRequests(),
        requestsApi.getAssignmentRequests(),
        requestsApi.getSwapRequests(),
      ])
      // If any request failed, throw an error to fail the whole query
      if (!leaveRes.success || !assignmentRes.success || !swapRes.success) {
        throw new Error(
          leaveRes.error || assignmentRes.error || swapRes.error || "Failed to fetch requests",
        )
      }

      // Unnest assignments and swap requests
      const assignments = assignmentRes.data?.map(({ event, ...rest }) => ({
        ...rest,
        event_id: event?.id,
        start_date: event?.start_time,
        end_date: event?.end_time,
      }))

      const swaps = swapRes.data?.map(({ event, ...rest }) => ({
        ...rest,
        event_id: event?.id,
        start_date: event?.start_time,
        end_date: event?.end_time,
      }))

      return {
        leave: leaveRes.data,
        assignment: assignments,
        swap: swaps,
      }
    },
    refetchOnMount: true,
  })

  return { userRequests, error, isPending, isFetching }
}

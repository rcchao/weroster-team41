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

      return {
        leave: leaveRes.data,
        assignment: assignmentRes.data,
        swap: swapRes.data,
      }
    },
    refetchOnMount: false,
  })

  return { userRequests, error, isPending, isFetching }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useMyShifts = () => {
  const {
    data: myShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["my-shifts"],
    queryFn: eventApi.getMyShifts,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { myShifts, error, isPending, isFetching }
}

export function useUpdateEventAssignment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: eventApi.updateEventAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shifts"] })
      queryClient.invalidateQueries({ queryKey: ["team-shifts"] })
    },
  })
}

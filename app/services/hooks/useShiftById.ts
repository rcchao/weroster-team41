import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useShiftById = (shiftId: number) => {
  const {
    data: shift,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["shift", shiftId],
    queryFn: () => eventApi.getShiftById(shiftId),
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { shift, error, isPending, isFetching }
}

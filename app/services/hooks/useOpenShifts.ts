import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useOpenShifts = () => {
  const {
    data: openShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["open-shifts"],
    queryFn: eventApi.getOpenShifts,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { openShifts, error, isPending, isFetching }
}

import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useEvents = () => {
  const {
    data: events,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getMyShifts,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { events, error, isPending, isFetching }
}

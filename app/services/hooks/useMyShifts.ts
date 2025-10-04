import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useMyShifts = () => {
  const {
    data: myShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["myShifts"],
    queryFn: eventApi.getMyShifts,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { myShifts, error, isPending, isFetching }
}

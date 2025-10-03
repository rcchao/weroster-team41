import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useTeamShifts = (day: number, month: number, year: number, session: string) => {
  const {
    data: teamShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["team-shifts"],
    queryFn: () => eventApi.getTeamShifts(day, month, year, session),
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { teamShifts, error, isPending, isFetching }
}

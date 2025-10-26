import { useQuery } from "@tanstack/react-query"
import { getDate, getMonth, getYear } from "date-fns"

import { eventApi } from "../api/eventsApi"

export const useTeamShifts = (
  date: Date,
  session: string,
  selectedCampuses: string[],
  selectedShowLocWithShifts: boolean,
) => {
  const day = getDate(date)
  const month = getMonth(date)
  const year = getYear(date)

  const {
    data: teamShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [
      "team-shifts",
      year,
      month,
      day,
      session,
      selectedCampuses,
      selectedShowLocWithShifts,
    ],
    queryFn: () =>
      eventApi.getTeamShifts(
        day,
        month,
        year,
        session,
        selectedCampuses,
        selectedShowLocWithShifts,
      ),
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { teamShifts, error, isPending, isFetching }
}

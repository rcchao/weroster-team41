import { useQuery } from "@tanstack/react-query"

import { campusApi } from "../api/campusApi"

export const useUpcomingCampusEvents = () => {
  const {
    data: upcomingCampusEvents,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["upcoming-campus-events"],
    queryFn: campusApi.getUpcomingCampusEvents,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { upcomingCampusEvents, error, isPending, isFetching }
}

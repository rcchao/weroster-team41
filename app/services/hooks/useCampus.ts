import { useQuery } from "@tanstack/react-query"

import { campusApi } from "../api/campusApi"

export const useCampusByLocationId = (locationId: number) => {
  const {
    data: campus,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["campus", locationId],
    queryFn: () => campusApi.getCampusByLocationId(locationId),
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { campus, error, isPending, isFetching }
}

import { useQuery } from "@tanstack/react-query"

import { settingsApi } from "../api/settingsApi"

export const useDashboardPreferences = () => {
  const {
    data: dashboardPreferences,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard-settings"],
    queryFn: settingsApi.getDashboardPreferences,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { dashboardPreferences, error, isPending, isFetching }
}

import { useQuery } from "@tanstack/react-query"

import { notificationsApi } from "../api/notificationsApi"

export const useSwapNotifications = () => {
  const {
    data: swapNotification,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["swap-notifications"],
    queryFn: async () => {
      const response = await notificationsApi.getSwapNotifications()

      // Unnest api response
      const teamMemberData = response.data?.map(({ swap, fromUser, ...rest }) => ({
        swap_id: swap?.id,
        message: swap?.message,
        status: swap?.status,
        event: swap?.event,
        ...fromUser,
        ...rest,
      }))

      return teamMemberData
    },
    refetchOnMount: false,
  })

  return { swapNotification, error, isPending, isFetching }
}

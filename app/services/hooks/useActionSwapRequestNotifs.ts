import { useQueryClient, useMutation } from "@tanstack/react-query"

import { notificationsApi } from "../api/notificationsApi"

export function useActionSwapRequestNotif() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsApi.actionSwapNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] })
      queryClient.invalidateQueries({ queryKey: ["my-shifts"] })
      queryClient.invalidateQueries({ queryKey: ["team-shifts"] })
    },
  })
}

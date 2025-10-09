import { useQuery } from "@tanstack/react-query"

import { authApi } from "../api/authApi"

export const useProfile = (userId: number) => {
  const {
    data: profile,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => authApi.getProfile(userId),
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { profile, error, isPending, isFetching }
}

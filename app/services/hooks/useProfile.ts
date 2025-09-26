import { useQuery } from "@tanstack/react-query"

import { authApi } from "../api/authApi"

export const useProfile = () => {
  const {
    data: profile,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    select: (result) => result.data,
    refetchOnMount: false,
  })

  return { profile, error, isPending, isFetching }
}

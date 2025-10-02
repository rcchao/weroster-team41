import { useQuery } from "@tanstack/react-query"

import { usersApi } from "../api/usersApi"

export const useTeamMemberData = () => {
  const {
    data: teamMemberData,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["team-member-data"],
    queryFn: async () => {
      const response = await usersApi.getTeamMemberData()

      // Unnest api response
      const teamMemberData = response.data?.map(({ event, user, designation, ...rest }) => ({
        ...user,
        designation_title: designation?.title,
        start_time: event?.start_time,
        end_time: event?.end_time,
        location_id: event?.location?.id,
        location_name: event?.location?.name,
        campus_id: event?.location?.campus?.id,
        campus_name: event?.location?.campus?.name,
        ...rest,
      }))

      return teamMemberData
    },
    refetchOnMount: false,
  })

  return { teamMemberData, error, isPending, isFetching }
}

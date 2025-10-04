import { useQuery } from "@tanstack/react-query"

import { eventApi } from "../api/eventApi"

export const useTeamShifts = (month: number, year: number, session: string) => {
  const {
    data: teamShifts,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["team-shifts"],
    queryFn: async () => {
      const response = await eventApi.getTeamShifts(month, year, session)

      // Transform the response to flatten the structure
      const transformedData = response.data?.map((campus) => ({
        ...campus,
        locations: campus.locations.map((location) => ({
          ...location,
          events: location.events.map((event) => ({
            id: event.id,
            activity: event.activity?.name,
            eventAssignments: event.eventAssignments.map((assignment) => ({
              id: assignment.user.id,
              first_name: assignment.user.first_name,
              last_name: assignment.user.last_name,
            })),
          })),
        })),
      }))

      return transformedData
    },
    refetchOnMount: false,
  })

  return { teamShifts, error, isPending, isFetching }
}

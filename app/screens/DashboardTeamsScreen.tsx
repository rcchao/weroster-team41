import { FC } from "react"
import { XStack, YStack, Spinner } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { Header } from "@/components/Header"
import { SearchHeader } from "@/components/SearchHeader"
import { TeamMemberCard } from "@/components/TeamMemberCard"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useTeamMemberData } from "@/services/hooks/useTeamMemberData"

export const DashboardTeamsScreen: FC<DashboardTabScreenProps<"DashboardTeams">> =
  function DashboardTeamsScreen(_props) {
    const { teamMemberData } = useTeamMemberData()

    return (
      <YStack flex={1}>
        <Header title="My Team" />
        <SearchHeader onSearch={(query) => console.log("Search query:", query)} />
        <YStack gap="$4" paddingVertical="$4" width="85%" alignSelf="center">
          {teamMemberData && teamMemberData.length > 0 ? (
            teamMemberData.map((request) => (
              <XStack key={request.id}>
                <TeamMemberCard
                  name={`${request.first_name} ${request.last_name}`}
                  userId={request.user_id}
                  startDate={request.start_time}
                  endDate={request.end_time}
                  role={request.designation_title ?? "General Staff"}
                  location={request.location_name}
                />
              </XStack>
            ))
          ) : (
            <YStack paddingTop="60%" gap="$3" alignItems="center">
              <Spinner size="large" color="$primary500" />
              <BodyText variant="body2">Loading...</BodyText>
            </YStack>
          )}
        </YStack>
      </YStack>
    )
  }

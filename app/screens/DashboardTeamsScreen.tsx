import { FC, useState, useMemo } from "react"
import { XStack, YStack, Spinner, ScrollView } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { SearchHeader } from "@/components/SearchHeader"
import { TeamMemberCard } from "@/components/TeamMemberCard"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useTeamMemberData } from "@/services/hooks/useTeamMemberData"

export const DashboardTeamsScreen: FC<DashboardTabScreenProps<"DashboardTeams">> =
  function DashboardTeamsScreen(_props) {
    const { teamMemberData } = useTeamMemberData()
    const [searchQuery, setSearchQuery] = useState("")

    // filter team members displayed based on what's being searched
    const filteredTeamMembers = useMemo(() => {
      if (!teamMemberData || !searchQuery.trim()) {
        return teamMemberData
      }

      const query = searchQuery.toLowerCase().trim()
      return teamMemberData.filter((member) => {
        const fullName = `${member.first_name} ${member.last_name}`.toLowerCase()
        const role = (member.designation_title || "").toLowerCase()
        const location = (member.location_name || "").toLowerCase()

        return fullName.includes(query) || role.includes(query) || location.includes(query)
      })
    }, [teamMemberData, searchQuery])

    const handleSearch = (query: string) => {
      setSearchQuery(query)
    }

    return (
      <Screen>
        <ScrollView stickyHeaderIndices={[0]} height="100%">
          <YStack>
            <Header title="My Team" />
            <SearchHeader onSearch={handleSearch} />
          </YStack>
          <YStack gap="$4" paddingVertical="$4" width="85%" alignSelf="center">
            {!teamMemberData ? (
              <YStack paddingTop="60%" gap="$3" alignItems="center">
                <Spinner size="large" color="$primary500" />
                <BodyText variant="body2">Loading...</BodyText>
              </YStack>
            ) : filteredTeamMembers && filteredTeamMembers.length > 0 ? (
              filteredTeamMembers.map((request) => (
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
                <BodyText variant="body2">
                  {searchQuery
                    ? "No team members found matching your search."
                    : "No team members available."}
                </BodyText>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </Screen>
    )
  }

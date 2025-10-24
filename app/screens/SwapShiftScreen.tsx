import { FC, useMemo, useState, useCallback } from "react"
import { Pressable } from "react-native"
import Toast from "react-native-toast-message"
import { ScrollView, Separator, Spinner, TextArea, XStack, YStack } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { SearchHeader } from "@/components/SearchHeader"
import { TeamMemberCard } from "@/components/TeamMemberCard"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useTeamMemberData } from "@/services/hooks/useTeamMemberData"
import { usePostSwapRequest } from "@/services/hooks/useUserRequests"
import { $styles } from "@/theme/styles"

interface SwapShiftScreenProps extends AppStackScreenProps<"SwapShift"> {}

interface SwapWithSectionProps {
  filteredTeamMembers: any[]
  teamIds: number[]
  selectedTeamMember: any
  teamMemberData: any[]
  searchQuery: string
  onSearch: (query: string) => void
  onSelectMember: (member: any) => void
}

const SwapWithSection: FC<SwapWithSectionProps> = ({
  filteredTeamMembers,
  teamIds,
  selectedTeamMember,
  teamMemberData,
  searchQuery,
  onSearch,
  onSelectMember,
}) => {
  const availableTeamMembers = filteredTeamMembers?.filter(
    (teamMember) =>
      !teamIds.includes(teamMember.user_id) && teamMember.user_id !== selectedTeamMember?.user_id,
  )

  return (
    <YStack gap="$3" flex={1} minHeight={0}>
      <HeaderText variant="h3">Swap With</HeaderText>
      <SearchHeader onSearch={onSearch} />
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$3" paddingBottom={10}>
          {!teamMemberData ? (
            <YStack paddingTop="60%" gap="$3" alignItems="center">
              <Spinner size="large" color="$primary500" />
              <BodyText variant="body2">Loading...</BodyText>
            </YStack>
          ) : availableTeamMembers && availableTeamMembers.length > 0 ? (
            availableTeamMembers.map((teamMember) => (
              <Pressable key={teamMember.id} onPress={() => onSelectMember(teamMember)}>
                <TeamMemberCard
                  name={`${teamMember.first_name} ${teamMember.last_name}`}
                  startDate={teamMember.start_time}
                  endDate={teamMember.end_time}
                  role={teamMember.designation_title ?? "General Staff"}
                  location={teamMember.location_name}
                />
              </Pressable>
            ))
          ) : (
            <YStack paddingTop="60%" gap="$3" alignItems="center">
              <BodyText variant="body2">
                {searchQuery
                  ? "No shifts found matching your search."
                  : teamMemberData && teamMemberData.length > 0
                    ? "No available team members for swap."
                    : "No team members available."}
              </BodyText>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}

export const SwapShiftScreen: FC<SwapShiftScreenProps> = ({ navigation, route }) => {
  const { shiftId, teamIds } = route.params
  const { teamMemberData } = useTeamMemberData()
  const swapMutation = usePostSwapRequest()
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>()
  const [message, setMessage] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  const requestSwapShift = async () => {
    // Validate that a team member must be selected
    if (selectedTeamMember === undefined) {
      return
    }

    // Navigate out of the swap shift screen first
    navigation.goBack()

    // If a team member is selected, try post a swap request
    try {
      // Swap the event with this shiftId to the selected user
      const swapData = await swapMutation.mutateAsync({
        to_user: selectedTeamMember.user_id,
        event_id: shiftId,
        message: message,
      })

      if (swapData.success) {
        Toast.show({
          type: "success",
          text1: "Successfully requested to swap shift",
        })
      } else {
        Toast.show({
          type: "failure",
          text1: "Error! Could not swap this shift",
        })
      }
    } catch (error) {
      console.error("Swap shift error log:", error)
      Toast.show({
        type: "failure",
        text1: "Error! Something went wrong",
      })
    }
  }

  const SwapShiftHeader = () => (
    <XStack height={36} justifyContent="space-between" alignItems="center">
      <Pressable
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Icon icon="lucideX" />
      </Pressable>
      <HeaderText variant="h2">Swap Shift</HeaderText>
      <Pressable onPress={requestSwapShift} disabled={!selectedTeamMember}>
        <YStack opacity={selectedTeamMember ? 1.0 : 0.3}>
          <Icon icon="check" />
        </YStack>
      </Pressable>
    </XStack>
  )

  const MessageSection = useMemo(() => {
    const placeholderText = selectedTeamMember
      ? `Write a message for ${selectedTeamMember.first_name} ${selectedTeamMember.last_name}`
      : "Write a message"

    return (
      <YStack gap="$3">
        <HeaderText variant="h3">Message</HeaderText>
        <TextArea
          placeholder={placeholderText}
          size="$2"
          padding="$3"
          borderWidth={1}
          borderColor="$mono400"
          borderRadius="$radius.3"
          height={100}
          backgroundColor="$white100"
          verticalAlign="top"
          value={message}
          onChangeText={setMessage}
        />
      </YStack>
    )
  }, [selectedTeamMember, message])

  const DisplaySelectedSection = () => (
    <Pressable
      onPress={() => {
        setSelectedTeamMember(undefined)
      }}
    >
      <TeamMemberCard
        name={`${selectedTeamMember.first_name} ${selectedTeamMember.last_name}`}
        startDate={selectedTeamMember.start_time}
        endDate={selectedTeamMember.end_time}
        role={selectedTeamMember.designation_title ?? "General Staff"}
        location={selectedTeamMember.location_name}
      />
    </Pressable>
  )

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

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleSelectMember = useCallback((member: any) => {
    setSelectedTeamMember(member)
  }, [])

  return (
    <Screen contentContainerStyle={$styles.barContainer}>
      <YStack width="85%" height="95%" alignSelf="center" gap="$3">
        <SwapShiftHeader />
        {MessageSection}
        {selectedTeamMember && <DisplaySelectedSection />}
        <Separator />
        <SwapWithSection
          filteredTeamMembers={filteredTeamMembers || []}
          teamIds={teamIds}
          selectedTeamMember={selectedTeamMember}
          teamMemberData={teamMemberData || []}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSelectMember={handleSelectMember}
        />
      </YStack>
    </Screen>
  )
}

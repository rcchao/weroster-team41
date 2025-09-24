import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { useTheme } from "tamagui"
import { YStack } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { AccordionDropdown } from "@/components/AccordionDropdown"
import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { RosterCalendar } from "@/components/RosterCalendar"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useEvents } from "@/services/hooks/useMyShifts"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "MyRoster">

export function MyRosterScreen(_props: Props) {
  const themes = useTheme()

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const accordionSections = [
    {
      sectionText: format(today, "EEE, d MMM"),
      isCurrent: true,
      children: (
        <YStack padding={16} backgroundColor={themes.white100.val}>
          <BodyText>Today&apos;s Shifts Here</BodyText>
        </YStack>
      ),
    },
    {
      sectionText: format(tomorrow, "EEE, d MMM"),
      isCurrent: false,
      children: (
        <YStack padding={16} backgroundColor={themes.white100.val}>
          <BodyText>Tomorrow&apos;s Shifts Here</BodyText>
        </YStack>
      ),
    },
  ]

  const { events, error } = useEvents()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer}>
      <RosterCalendar />
      <HeaderText>My Roster</HeaderText>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for <Text weight="bold">My Roster</Text>. Replace this area with
          your roster list/calendar.
        </Text>
        {events ? (
          <View>
            {events.map((event: ShiftWithNumUsers) => (
              <View key={event.id}>
                <BodyText variant="body4">
                  {event.id}: {event.activity?.name} @ {event.location?.name} on{" "}
                  {format(event.start_time!, "dd MMM yyyy 'at' h:mma")} to{" "}
                  {format(event.end_time!, "h:mma")} with {event.numUsers}{" "}
                  {event.numUsers === 1 ? "user" : "users"}
                </BodyText>

                {/* Users for this event */}
                {event.eventAssignments && event.eventAssignments.length > 0 ? (
                  <View>
                    {event.eventAssignments.map((assignment) => (
                      <BodyText key={assignment.id} variant="body4">
                        - {assignment.user?.first_name} {assignment.user?.last_name} (
                        {assignment.designation?.title ?? "No designation"})
                      </BodyText>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}

            {events.length === 0 && <BodyText variant="body4">No events found</BodyText>}
          </View>
        ) : (
          <BodyText variant="body4">{error}</BodyText>
        )}

        <BodyText variant="body4" mt={12}>
          {JSON.stringify(events)}
        </BodyText>
        <AccordionDropdown sections={accordionSections} />
      </View>
    </Screen>
  )
}

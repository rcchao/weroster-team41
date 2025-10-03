import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useTeamShifts } from "@/services/hooks/useTeamShifts"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const { themed } = useAppTheme()
  const { teamShifts, isPending, error } = useTeamShifts(20, 0, 2025, "AM")

  if (isPending) {
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container}>
        <Text>Loading...</Text>
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container}>
        <Text>Error: {error.message}</Text>
      </Screen>
    )
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Text preset="heading" style={themed(() => ({ marginBottom: 12 }))}>
        Team Roster
      </Text>

      {teamShifts?.map((campus) => (
        <View key={campus.id}>
          <Text>Campus: {campus.name}</Text>

          {campus.locations.map((location) => (
            <View key={location.id}>
              <Text>Location: {location.name}</Text>

              {location.events.length === 0 ? (
                <Text>No events scheduled</Text>
              ) : (
                location.events.map((event) => (
                  <View key={event.id}>
                    <Text>Event ID: {event.id}</Text>
                    <Text>Activity: {event.activity}</Text>

                    {event.eventAssignments.length === 0 ? (
                      <Text>No staff assigned</Text>
                    ) : (
                      <View>
                        <Text>Assigned Staff:</Text>
                        {event.eventAssignments.map((assignment) => (
                          <View key={assignment.id}>
                            <Text>
                              • {assignment.first_name} {assignment.last_name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          ))}
        </View>
      ))}
    </Screen>
  )
}

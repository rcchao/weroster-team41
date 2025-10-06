import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"

import { OpenShift } from "backend/src/types/event.types"

import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useOpenShifts } from "@/services/hooks/useOpenShifts"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "OpenShifts">

export function OpenShiftsScreen(_props: Props) {
  const { themed } = useAppTheme()
  const { openShifts } = useOpenShifts()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Text preset="heading" style={themed(() => ({ marginBottom: 12 }))}>
        Open Shifts
      </Text>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for <Text weight="bold">Open Shifts</Text>. Show available shifts
          and actions (request, apply, etc.) here.
        </Text>
      </View>

      {openShifts && (
        <View>
          {openShifts.map((event: OpenShift) => (
            <View key={event.id}>
              <BodyText variant="body4">
                {event.id}: {event.activity} @ {event.location} on{" "}
                {format(event.start_time!, "dd MMM yyyy 'at' h:mma")} to{" "}
                {format(event.end_time!, "h:mma")} with {event.numUsers} users with pay {event.pay}{" "}
                and status {event.status}
              </BodyText>
            </View>
          ))}

          {openShifts.length === 0 && <BodyText variant="body4">No events found</BodyText>}
        </View>
      )}
    </Screen>
  )
}

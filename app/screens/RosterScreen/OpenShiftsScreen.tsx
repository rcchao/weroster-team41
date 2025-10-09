import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"

import { OpenShift } from "backend/src/types/event.types"

import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import { SubmitButton } from "@/components/SubmitButton"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useOpenShifts } from "@/services/hooks/useOpenShifts"
import { usePostAssignmentRequest } from "@/services/hooks/useUserRequests"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "OpenShifts">

export function OpenShiftsScreen(_props: Props) {
  const { themed } = useAppTheme()
  const { openShifts } = useOpenShifts()
  const mutation = usePostAssignmentRequest()

  const postOpenShiftRequest = async () => {
    const assignmentRequest = { event_id: 4 }
    try {
      const data = await mutation.mutateAsync(assignmentRequest)
      if (data.success) {
        console.log("Posted successfully", data)
      } else {
        // Error messages here are "Not an open shift, cannot make assignment request"
        // and "Event not found". If either of these are the case, the frontend
        // shouldn't even allow a user to apply to the open shift so don't
        // worry about bubbling these errors up to the frontend
        console.log("Post failed", data.error)
      }
    } catch (error) {
      console.error("Error posting:", error)
    }
  }

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
      <SubmitButton text="apply for open shift" onPress={postOpenShiftRequest} />

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

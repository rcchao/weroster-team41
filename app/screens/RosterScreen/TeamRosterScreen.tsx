import { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { DateSelectorBar } from "@/components/DateSelectorBar"
import type { Session } from "@/components/ShiftDetailsSubheader"
import { SubmitButton } from "@/components/SubmitButton"
import { TeamRosterShiftTabBar } from "@/components/TeamRosterShiftTabBar"
import { TeamRosterTableView } from "@/components/TeamRosterTableView"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useTeamShifts } from "@/services/hooks/useTeamShifts"
import { usePostAssignmentRequest } from "@/services/hooks/useUserRequests"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [session, setSession] = useState("AM" as Session)

  const { teamShifts } = useTeamShifts(selectedDate, session)

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
    <>
      <DateSelectorBar mode="day" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TeamRosterShiftTabBar timeSection={session} setTimeSection={setSession} />
      {teamShifts && <TeamRosterTableView campusShifts={teamShifts} />}
      <SubmitButton text="apply for open shift" onPress={postOpenShiftRequest} />
    </>
  )
}

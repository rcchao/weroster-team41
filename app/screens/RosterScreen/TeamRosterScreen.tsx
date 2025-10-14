import { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { DateSelectorBar } from "@/components/DateSelectorBar"
import type { Session } from "@/components/ShiftDetailsSubheader"
import { TeamRosterShiftTabBar } from "@/components/TeamRosterShiftTabBar"
import { TeamRosterTableView } from "@/components/TeamRosterTableView"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useTeamShifts } from "@/services/hooks/useTeamShifts"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [session, setSession] = useState("AM" as Session)

  const { teamShifts } = useTeamShifts(selectedDate, session)

  return (
    <>
      <DateSelectorBar mode="day" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TeamRosterShiftTabBar timeSection={session} setTimeSection={setSession} />
      {teamShifts && <TeamRosterTableView campusShifts={teamShifts} />}
    </>
  )
}

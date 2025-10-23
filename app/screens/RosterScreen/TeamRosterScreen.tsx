import { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { DateSelectorBar } from "@/components/DateSelectorBar"
import type { Session } from "@/components/ShiftDetailsSubheader"
import { TeamRosterFilterBottomSheet } from "@/components/TeamRosterFilterBottomSheet"
import { TeamRosterShiftTabBar } from "@/components/TeamRosterShiftTabBar"
import { TeamRosterTableView } from "@/components/TeamRosterTableView"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useTeamShifts } from "@/services/hooks/useTeamShifts"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [session, setSession] = useState("AM" as Session)
  const [filterBottomSheet, setFilterBottomSheet] = useState(false)

  const { teamShifts } = useTeamShifts(selectedDate, session)

  return (
    <>
      <DateSelectorBar
        mode="day"
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setFilterSheetOpen={setFilterBottomSheet}
      />
      <TeamRosterShiftTabBar timeSection={session} setTimeSection={setSession} />
      {teamShifts && (
        <>
          <TeamRosterTableView campusShifts={teamShifts} />
          <TeamRosterFilterBottomSheet
            open={filterBottomSheet}
            onOpenChange={setFilterBottomSheet}
            campusShifts={teamShifts}
          />
        </>
      )}
    </>
  )
}

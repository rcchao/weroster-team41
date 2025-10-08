import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { RosterCalendar } from "@/components/RosterCalendar"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useMyShifts } from "@/services/hooks/useMyShifts"

type Props = NativeStackScreenProps<RosterStackParamList, "MyRoster">

export function MyRosterScreen(_props: Props) {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const { myShifts } = useMyShifts()

  return <RosterCalendar events={myShifts ?? []} />
}

import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { RosterCalendar } from "@/components/RosterCalendar"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useOpenShifts } from "@/services/hooks/useOpenShifts"

type Props = NativeStackScreenProps<RosterStackParamList, "OpenShifts">

export function OpenShiftsScreen(_props: Props) {
  const { openShifts } = useOpenShifts()

  return <RosterCalendar events={openShifts ?? []} />
}

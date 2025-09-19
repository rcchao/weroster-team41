import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { RosterHeader } from "@/components/RosterHeader"
import { MyRosterScreen } from "@/screens/RosterScreen/MyRosterScreen"
import { OpenShiftsScreen } from "@/screens/RosterScreen/OpenShiftsScreen"
import { TeamRosterScreen } from "@/screens/RosterScreen/TeamRosterScreen"
import { useAppTheme } from "@/theme/context"

export type RosterStackParamList = {
  MyRoster: undefined
  TeamRoster: undefined
  OpenShifts: undefined
}

const RosterStack = createNativeStackNavigator<RosterStackParamList>()

export function DashboardRosterScreen() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <RosterStack.Navigator
      initialRouteName="MyRoster"
      screenOptions={{
        headerShown: true,
        header: () => <RosterHeader />,
        contentStyle: { backgroundColor: colors.background },
        animation: "none",
        gestureEnabled: false,
      }}
    >
      <RosterStack.Screen name="MyRoster" component={MyRosterScreen} />
      <RosterStack.Screen name="TeamRoster" component={TeamRosterScreen} />
      <RosterStack.Screen name="OpenShifts" component={OpenShiftsScreen} />
    </RosterStack.Navigator>
  )
}

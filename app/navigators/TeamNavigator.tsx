import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { DashboardTeamsScreen } from "@/screens/DashboardTeamsScreen"
import { TeamDetailsScreen } from "@/screens/TeamDetailsScreen"

export type TeamStackParamList = {
  DashboardTeamsScreen: undefined
  TeamDetails: { userId: number }
}

const Stack = createNativeStackNavigator<TeamStackParamList>()

export const TeamNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardTeamsScreen" component={DashboardTeamsScreen} />
    <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
  </Stack.Navigator>
)

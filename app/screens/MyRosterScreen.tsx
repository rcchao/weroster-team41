import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "MyRoster">

export function MyRosterScreen(_props: Props) {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Text preset="heading" style={themed(() => ({ marginBottom: 12 }))}>
        My Roster
      </Text>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for <Text weight="bold">My Roster</Text>. Replace this area with
          your roster list/calendar.
        </Text>
      </View>
    </Screen>
  )
}

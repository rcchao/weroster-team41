import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Text preset="heading" style={themed(() => ({ marginBottom: 12 }))}>
        Team Roster
      </Text>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for the <Text weight="bold">Team Roster</Text>. Add filters,
          groupings, and list/calendar UI here.
        </Text>
      </View>
    </Screen>
  )
}

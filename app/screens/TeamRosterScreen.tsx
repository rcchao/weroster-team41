import { useLayoutEffect } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useRosterHeader } from "@/components/RosterHeader"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "TeamRoster">

export function TeamRosterScreen(_props: Props) {
  const navigation = useNavigation()
  const header = useRosterHeader()
  const { themed } = useAppTheme()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: true, header: () => header })
  }, [navigation, header])

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

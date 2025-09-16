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

type Props = NativeStackScreenProps<RosterStackParamList, "OpenShifts">

export function OpenShiftsScreen(_props: Props) {
  const navigation = useNavigation()
  const header = useRosterHeader()
  const { themed } = useAppTheme()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: true, header: () => header })
  }, [navigation, header])

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Text preset="heading" style={themed(() => ({ marginBottom: 12 }))}>
        Open Shifts
      </Text>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for <Text weight="bold">Open Shifts</Text>. Show available shifts
          and actions (request, apply, etc.) here.
        </Text>
      </View>
    </Screen>
  )
}

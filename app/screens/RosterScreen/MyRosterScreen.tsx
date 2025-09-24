import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { useTheme } from "tamagui"
import { YStack } from "tamagui"

import { AccordionDropdown } from "@/components/AccordionDropdown"
import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { $styles } from "@/theme/styles"

type Props = NativeStackScreenProps<RosterStackParamList, "MyRoster">

export function MyRosterScreen(_props: Props) {
  const themes = useTheme()

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const accordionSections = [
    {
      sectionText: format(today, "EEEE, MMM d"),
      isCurrent: true,
      children: (
        <YStack padding={16} backgroundColor={themes.white100.val}>
          <BodyText>Today&apos;s Shifts Here</BodyText>
        </YStack>
      ),
    },
    {
      sectionText: format(tomorrow, "EEEE, MMM d"),
      isCurrent: false,
      children: (
        <YStack padding={16} backgroundColor={themes.white100.val}>
          <BodyText>Tomorrow&apos;s Shifts Here</BodyText>
        </YStack>
      ),
    },
  ]

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer}>
      <HeaderText>My Roster</HeaderText>

      <View>
        <Text preset="subheading">Coming soon</Text>
        <Text>
          This is the base screen for <Text weight="bold">My Roster</Text>. Replace this area with
          your roster list/calendar.
        </Text>
        <AccordionDropdown sections={accordionSections} />
      </View>
    </Screen>
  )
}

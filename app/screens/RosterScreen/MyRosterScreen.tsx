// import { useState } from "react"
import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { useTheme, YStack } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { AccordionDropdown } from "@/components/AccordionDropdown"
import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useMyShifts } from "@/services/hooks/useMyShifts"

type Props = NativeStackScreenProps<RosterStackParamList, "MyRoster">

export function MyRosterScreen(_props: Props) {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  // const accordionSections = [
  //   {
  //     sectionText: format(today, "EEE, d MMM"),
  //     isCurrent: true,
  //     children: (
  //       <YStack padding={16} backgroundColor={themes.white100.val}>
  //         <BodyText>Today&apos;s Shifts Here</BodyText>
  //       </YStack>
  //     ),
  //   },
  //   {
  //     sectionText: format(tomorrow, "EEE, d MMM"),
  //     isCurrent: false,
  //     children: (
  //       <YStack padding={16} backgroundColor={themes.white100.val}>
  //         <BodyText>Tomorrow&apos;s Shifts Here</BodyText>
  //       </YStack>
  //     ),
  //   },
  // ]

  const { myShifts } = useMyShifts()

  return <RosterCalendar events={myShifts ?? []} />
}

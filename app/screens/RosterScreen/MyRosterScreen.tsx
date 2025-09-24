import { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { useTheme } from "tamagui"
import { YStack } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"
import { addDays, format } from "date-fns"
import { DateData } from "react-native-calendars"
import { XStack } from "tamagui"

import { AccordionDropdown } from "@/components/AccordionDropdown"
import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { DayEvent, DayPill } from "@/components/DayPill"
import { Screen } from "@/components/Screen"
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

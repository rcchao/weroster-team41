import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { RosterCalendar } from "@/components/RosterCalendar"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"
import { useEvents } from "@/services/hooks/useMyShifts"

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

  const { events } = useEvents()

  return <RosterCalendar events={events ?? []} />
}

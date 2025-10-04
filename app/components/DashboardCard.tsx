import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { HeaderText } from "./HeaderText"
import { IconBadge } from "./IconBadge"

const CARD_WIDTH_MAP: Record<string, number> = {
  allocatedShift: 245,
  openShift: 260,
  leave: 230,
  team: 200,
}

interface DashboardCardProps {
  type: "leave" | "team" | "allocatedShift" | "openShift"
  date?: Date
  leaveDuration?: string
  leaveType?: string
  leaveStatus?: string
  teamLocation?: string
  teamOnCall?: number
  teamInPerson?: number
  shiftTimeRange?: string
  shiftLocation?: string
  shiftDesignation?: string
  shiftNumUsers?: number
  openShiftStatus?: string
  openShiftExtraPay?: number
}

export const DashboardCard = (props: DashboardCardProps) => {
  const displayDate = props.date ? format(props.date, "EEE, d MMM") : ""

  const cardWidth = CARD_WIDTH_MAP[props.type]
  const cardHeader = props.type === "team" ? props.teamLocation : displayDate

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      width={cardWidth}
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack>
        <YStack>
          <HeaderText variant="h2">{cardHeader}</HeaderText>
        </YStack>
        <IconBadge type="halfDay" />
      </XStack>
    </Card>
  )
}

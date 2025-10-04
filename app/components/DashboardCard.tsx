import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { HeaderText } from "./HeaderText"
import { IconBadge } from "./IconBadge"
import { Lozenge, LozengeType } from "./Lozenge"

const CARD_WIDTH_MAP: Record<string, number> = {
  allocatedShift: 245,
  openShift: 260,
  leave: 230,
  team: 200,
}

// interface CardInfoConfig {
//   icon: IconBadgeType
//   text: string
// }

// const CARD_INFO_CONFIG_MAP: Record<string, CardInfoConfig> = {}

interface DashboardCardProps {
  type: "leave" | "team" | "allocatedShift" | "openShift"
  date?: Date
  leaveDuration?: string
  leaveType?: string
  leaveStatus?: LozengeType
  teamCampus?: string
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
  const isLeave = props.type === "leave"
  const isTeam = props.type === "team"
  const isAllocatedShift = props.type === "allocatedShift"
  const isOpenShift = props.type === "openShift"

  const displayDate = props.date ? format(props.date, "EEE, d MMM") : ""
  // TODO: Icon will be determined by logic on leaveDuration and shiftTimeRange.
  const icon = "halfDay"

  const cardWidth = CARD_WIDTH_MAP[props.type]
  const cardHeader = props.type === "team" ? props.teamCampus : displayDate

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      width={cardWidth}
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack justifyContent="space-between">
        <YStack width={isTeam ? "100%" : "60%"}>
          <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
            {cardHeader}
          </HeaderText>
          {isLeave && renderLeaveDetails(props.leaveDuration, props.leaveType, props.leaveStatus)}
          {isTeam &&
            renderTeamDetails(
              displayDate,
              props.teamOnCall,
              props.teamLocation,
              props.teamInPerson,
            )}
          <YStack gap="$1.5">
            {(isAllocatedShift || isOpenShift) &&
              renderShiftDetails(props.shiftTimeRange, props.shiftLocation, props.shiftDesignation)}
            {isAllocatedShift && renderShiftNumUsers(props.shiftNumUsers)}
            {isOpenShift && renderOpenShiftExtraPay(props.openShiftExtraPay)}
          </YStack>
        </YStack>
        {(isLeave || isAllocatedShift) && <IconBadge type={icon} />}
        {isOpenShift && <Lozenge type="available" />}
      </XStack>
    </Card>
  )
}

// Helper functions
const renderLeaveDetails = (
  leaveDuration?: string,
  leaveType?: string,
  leaveStatus?: LozengeType,
) => {
  return (
    <YStack gap="$1.5">
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="clock" />
        <BodyText variant="body3">{leaveDuration}</BodyText>
      </XStack>
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="clipboard" />
        <BodyText variant="body3">{leaveType}</BodyText>
      </XStack>
      {leaveStatus && <Lozenge type={leaveStatus} />}
    </YStack>
  )
}

const renderTeamDetails = (
  date?: string,
  teamOnCall?: number,
  teamLocation?: string,
  teamInPerson?: number,
) => {
  return (
    <YStack gap="$1.5">
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="roster" />
        <BodyText variant="body3">{date}</BodyText>
      </XStack>
      <BodyText variant="body3" fontWeight="900">
        On Call:
        <BodyText variant="body3"> {teamOnCall} staff</BodyText>
      </BodyText>
      <BodyText variant="body3" fontWeight="900">
        {teamLocation}:<BodyText variant="body3"> {teamInPerson} staff</BodyText>
      </BodyText>
    </YStack>
  )
}

const renderShiftDetails = (
  shiftTimeRange?: string,
  shiftLocation?: string,
  shiftDesignation?: string,
) => {
  return (
    <YStack gap="$1.5">
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="clock" />
        <BodyText variant="body3">{shiftTimeRange}</BodyText>
      </XStack>
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="building" />
        <BodyText variant="body3">{shiftLocation}</BodyText>
      </XStack>
      <XStack gap="$1" alignItems="center">
        <StyledIcon icon="stethoscope" />
        <BodyText variant="body3">{shiftDesignation}</BodyText>
      </XStack>
    </YStack>
  )
}

const renderShiftNumUsers = (shiftNumUsers?: number) => {
  return (
    <XStack gap="$1" alignItems="center">
      <StyledIcon icon="teams" />
      <BodyText variant="body3">Working with {shiftNumUsers} others</BodyText>
    </XStack>
  )
}

const renderOpenShiftExtraPay = (openShiftExtraPay?: number) => {
  return (
    <XStack gap="$1" alignItems="center">
      <BodyText variant="body2" color="$secondary500">
        +${openShiftExtraPay}{" "}
        <BodyText variant="body2" color="$secondary500" fontWeight="900">
          extra pay
        </BodyText>
      </BodyText>
    </XStack>
  )
}

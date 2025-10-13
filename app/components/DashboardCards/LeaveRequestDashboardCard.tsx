/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInHours, format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"
import { IconBadge } from "../IconBadge"
import { Lozenge, LozengeType } from "../Lozenge"
import { LeaveType } from "../RequestCard"

const LEAVE_TYPE_MAP: Record<LeaveType, string> = {
  ANNUAL: "Annual Leave",
  SICK: "Sick Leave",
  COMPASSIONATE: "Compassionate Leave",
  PARENTAL: "Parental Leave",
  UNPAID: "Unpaid Leave",
}

interface LeaveRequestDashboardCardProp {
  startDate: Date
  endDate: Date
  leaveType: LeaveType
  leaveStatus: LozengeType
}

export const LeaveRequestDashboardCard = ({
  startDate,
  endDate,
  leaveType,
  leaveStatus,
}: LeaveRequestDashboardCardProp) => {
  const displayDate = format(startDate, "EEE, d MMM")
  const leaveDuration = differenceInHours(endDate, startDate)

  const icon = leaveDuration <= 12 ? "halfDay" : "fullDay"
  const leaveDurationDisplayText = leaveDuration <= 12 ? "Half-day" : "Full-day"
  const leaveTypeDisplayText = LEAVE_TYPE_MAP[leaveType] || "Leave"

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      minWidth={230}
      alignSelf="flex-start"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack justifyContent="space-between">
        <YStack alignSelf="flex-start">
          <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
            {displayDate}
          </HeaderText>
          <YStack gap="$2">
            <YStack gap="$1.5">
              <XStack gap="$1" alignItems="center">
                <StyledIcon icon="clock" />
                <BodyText variant="body3">{leaveDurationDisplayText}</BodyText>
              </XStack>
              <XStack gap="$1" alignItems="center">
                <StyledIcon icon="clipboard" />
                <BodyText variant="body3">{leaveTypeDisplayText}</BodyText>
              </XStack>
            </YStack>
            <Lozenge type={leaveStatus} />
          </YStack>
        </YStack>
        <YStack marginTop={5}>
          <IconBadge type={icon} />
        </YStack>
      </XStack>
    </Card>
  )
}

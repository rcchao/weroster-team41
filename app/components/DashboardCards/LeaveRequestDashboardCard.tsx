/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInHours, format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"
import { IconBadge } from "../IconBadge"
import { LozengeType } from "../Lozenge"
import { LeaveType } from "../RequestCard"

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

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      width={230}
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack justifyContent="space-between">
        <YStack width="60%">
          <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
            {displayDate}
          </HeaderText>
          <YStack gap="$1.5">
            <XStack gap="$1" alignItems="center">
              <StyledIcon icon="clock" />
              <BodyText variant="body3">{leaveDurationDisplayText}</BodyText>
            </XStack>
          </YStack>
        </YStack>
        <IconBadge type={icon} />
      </XStack>
    </Card>
  )
}

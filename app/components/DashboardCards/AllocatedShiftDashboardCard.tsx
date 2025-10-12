import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"
import { IconBadge, IconBadgeType } from "../IconBadge"
import { Session } from "../ShiftDetailsSubheader"

const SHIFT_SESSION_ICONBADGE_MAP: Record<Session, IconBadgeType> = {
  AM: "AMShift",
  PM: "PMShift",
  AH: "AHShift",
}

interface AllocatedShiftDashboardCardProps {
  startDate: Date
  endDate: Date
  campus?: string
  activity: string | null
  numUsers: number
  session: Session
}

export const AllocatedShiftDashboardCard = ({
  startDate,
  endDate,
  campus,
  activity,
  numUsers,
  session,
}: AllocatedShiftDashboardCardProps) => {
  const displayDate = format(startDate, "EEE, d MMM")
  const timeRange = `${format(startDate, "H:mm")} - ${format(endDate, "H:mm")}`

  const icon = SHIFT_SESSION_ICONBADGE_MAP[session]

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      minWidth={245}
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
          <YStack gap="$1.5">
            <XStack gap="$1.5" alignItems="center">
              <StyledIcon icon="clock" />
              <BodyText variant="body3">{timeRange}</BodyText>
            </XStack>
            {campus && (
              <XStack gap="$1.5" alignItems="center">
                <StyledIcon icon="building" />
                <BodyText variant="body3">{campus}</BodyText>
              </XStack>
            )}
            <XStack gap="$1.5" alignItems="center">
              <StyledIcon icon="stethoscope" />
              <BodyText variant="body3">{activity}</BodyText>
            </XStack>
            <XStack gap="$1.5" alignItems="center">
              <StyledIcon icon="teams" />
              <BodyText variant="body3">
                Working with {numUsers} {numUsers === 1 ? "other" : "others"}
              </BodyText>
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={5}>
          <IconBadge type={icon} />
        </YStack>
      </XStack>
    </Card>
  )
}

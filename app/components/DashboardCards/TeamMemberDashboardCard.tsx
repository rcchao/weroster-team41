import { format } from "date-fns"
import { Avatar, Card, XStack, YStack } from "tamagui"

import { getAbbreviatedName, getInitials } from "@/utils/nameFormatting"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"

interface TeamMemberDashboardCardProps {
  firstName: string
  lastName: string
  designation?: string
  location: string
  campus: string
  shiftStartTime: Date
  shiftEndTime: Date
}

export const TeamMemberDashboardCard = ({
  firstName,
  lastName,
  designation,
  location,
  campus,
  shiftStartTime,
  shiftEndTime,
}: TeamMemberDashboardCardProps) => (
  <Card
    backgroundColor="$white200"
    minWidth={270}
    width="auto"
    alignSelf="flex-start"
    padding={15}
    elevation={4}
    shadowColor="$mono900"
    shadowOffset={{ width: 0, height: 4 }}
    shadowOpacity={0.25}
    shadowRadius={4}
    borderRadius="$radius.4"
  >
    <XStack alignItems="center" gap={15}>
      <Avatar size={84} borderRadius="$radius.4" width="40%">
        <Avatar.Fallback
          backgroundColor="$secondary400"
          justifyContent="center"
          alignItems="center"
        >
          <HeaderText variant="h2">{getInitials(firstName, lastName)}</HeaderText>
        </Avatar.Fallback>
      </Avatar>
      <YStack gap="$1">
        <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
          {getAbbreviatedName(firstName, lastName)}
        </HeaderText>
        <XStack alignItems="center" gap="$2">
          <StyledIcon icon="stethoscope" />
          <BodyText variant="body3">{designation ?? "General Staff"}</BodyText>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <StyledIcon icon="location" />
          <BodyText variant="body3">{location}</BodyText>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <StyledIcon icon="building" />
          <BodyText variant="body3">{campus}</BodyText>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <StyledIcon icon="clock" />
          <BodyText variant="body3">
            {format(shiftStartTime, "d MMM H:mm")} - {format(shiftEndTime, "d MMM H:mm")}
          </BodyText>
        </XStack>
      </YStack>
    </XStack>
  </Card>
)

import { format } from "date-fns"
import { Card, useTheme, XStack, YStack } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { Icon, IconTypes } from "./Icon"

type ShiftSession = "AM" | "PM" | "AH"

export const SHIFT_SESSION_ICON_MAP: Record<ShiftSession, string> = {
  AM: "am",
  PM: "pm",
  AH: "afterHours",
}

export const SHIFT_SESSION_COLOR_MAP: Record<ShiftSession, string> = {
  AM: "yellow400",
  PM: "red500",
  AH: "secondary300",
}

interface ShiftCardProps {
  shift: ShiftWithNumUsers
  clashes?: boolean
}

const ShiftCard = ({ shift, clashes }: ShiftCardProps) => {
  const theme = useTheme()

  const isOpenShift = shift.numUsers === 0
  const firstSession = shift.eventSessions[0] as ShiftSession

  const iconSubText = isOpenShift ? "Open" : firstSession
  const getIconBgToken = () => {
    if (clashes) return "mono300"
    if (isOpenShift) return "green500"
    if (firstSession) return SHIFT_SESSION_COLOR_MAP[firstSession]
    return "mono200"
  }

  const iconBgColor = theme[getIconBgToken()]?.val
  const icon = SHIFT_SESSION_ICON_MAP[firstSession] as IconTypes
  const cardBgColor = isOpenShift ? theme["green200"].val : theme.white200?.val

  return (
    <Card
      backgroundColor={cardBgColor}
      height={80}
      width={"100%"}
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
      borderRadius="$radius.4"
    >
      <XStack alignItems="center" gap="$3" height={"100%"} padding="$2">
        <YStack
          height={"100%"}
          width={64}
          backgroundColor={iconBgColor}
          alignItems="center"
          justifyContent="center"
          borderRadius="$radius.4"
          gap="$2"
        >
          {icon && <Icon icon={icon} size={24} />}
          <BodyText variant="body4">{iconSubText}</BodyText>
        </YStack>
        <YStack gap="$1.5">
          <XStack alignItems="center" gap="$2">
            <StyledIcon icon="clock" />
            <BodyText variant="body2">
              {format(shift.start_time, "HH:mm")} - {format(shift.end_time, "HH:mm")}
            </BodyText>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <StyledIcon icon="building" />
            <BodyText variant="body2">{shift.location}</BodyText>
          </XStack>
          {shift.numUsers && (
            <XStack gap="$2">
              <StyledIcon icon="user2" />
              <BodyText variant="body2">Working with {shift.numUsers} others</BodyText>
            </XStack>
          )}
        </YStack>
      </XStack>
    </Card>
  )
}

export { ShiftCard }

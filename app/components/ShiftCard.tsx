import { format } from "date-fns"
import { Card, useTheme, XStack, YStack } from "tamagui"

import { ShiftWithNumUsers, OpenShift } from "backend/src/types/event.types"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { Icon, IconTypes } from "./Icon"
import { type Session, SESSION_LABEL_BG_COLOUR_MAP } from "./ShiftDetailsSubheader"

export const SHIFT_SESSION_ICON_MAP: Record<Session, string> = {
  AM: "am",
  PM: "pm",
  AH: "afterHours",
}

interface ShiftCardProps {
  shift: ShiftWithNumUsers | OpenShift
  clashes?: boolean
}

const ShiftCard = ({ shift, clashes }: ShiftCardProps) => {
  const theme = useTheme()

  const isOpenShift = "status" in shift
  const firstSession = shift.eventSessions[0] as Session

  // Configuration map for different shift states
  const getShiftConfig = () => {
    if (clashes) {
      return {
        iconSubText: firstSession,
        iconBgColor: theme[SESSION_LABEL_BG_COLOUR_MAP[firstSession]]?.val,
        cardBgColor: theme.white200?.val,
        icon: SHIFT_SESSION_ICON_MAP[firstSession] as IconTypes,
      }
    }

    if (isOpenShift && shift.status === "REQUESTED") {
      return {
        iconSubText: "Pending",
        iconBgColor: theme.yellow300?.val,
        cardBgColor: theme.yellow100?.val,
        icon: SHIFT_SESSION_ICON_MAP[firstSession] as IconTypes,
      }
    }

    if (isOpenShift) {
      return {
        iconSubText: "Open",
        iconBgColor: theme.green500?.val,
        cardBgColor: theme.green200?.val,
        icon: SHIFT_SESSION_ICON_MAP[firstSession] as IconTypes,
      }
    }

    return {
      iconSubText: firstSession,
      iconBgColor: theme[SESSION_LABEL_BG_COLOUR_MAP[firstSession]]?.val,
      cardBgColor: theme.white200?.val,
      icon: SHIFT_SESSION_ICON_MAP[firstSession] as IconTypes,
    }
  }

  const config = getShiftConfig()

  return (
    <Card
      backgroundColor={config.cardBgColor}
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
          aspectRatio={1}
          backgroundColor={config.iconBgColor}
          alignItems="center"
          justifyContent="center"
          borderRadius="$radius.4"
          gap="$2"
        >
          {config.icon && <Icon icon={config.icon} size={24} />}
          <BodyText variant="body4">{config.iconSubText}</BodyText>
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
          {shift.numUsers > 0 && (
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

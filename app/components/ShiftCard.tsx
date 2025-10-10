import { Pressable } from "react-native"
import { format } from "date-fns"
import { Card, Dialog, ScrollView, useTheme, XStack, YStack } from "tamagui"

import { ShiftWithNumUsers, OpenShift } from "backend/src/types/event.types"

import { ThemeProvider } from "@/theme/context"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { Icon, IconTypes } from "./Icon"
import { ShiftDetailCard } from "./ShiftDetailCard"
import {
  type Session,
  SESSION_LABEL_BG_COLOUR_MAP,
  ShiftDetailsSubheader,
} from "./ShiftDetailsSubheader"

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
    <Dialog modal>
      <Dialog.Trigger asChild>
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
      </Dialog.Trigger>

      <Dialog.Portal>
        <ThemeProvider>
          <Dialog.Close asChild>
            <Dialog.Overlay key="overlay" opacity={0.5} backgroundColor="$mono900" />
          </Dialog.Close>

          <Dialog.Content
            key="content"
            width="90%"
            height="70%"
            padding={0}
            margin={0}
            backgroundColor="$white500"
            shadowColor="transparent"
            elevate={false}
            elevation={0}
            shadowOpacity={0}
            shadowRadius={0}
          >
            <XStack
              alignItems="center"
              justifyContent="center"
              height={56}
              padding={16}
              backgroundColor="$white100"
              borderTopLeftRadius="$4"
              borderTopRightRadius="$4"
            >
              <BodyText variant="body2" fontWeight={900} color="$mono900">
                Shift Details
              </BodyText>
              <Dialog.Close asChild>
                <Pressable hitSlop={10} style={$closeButtonStyles}>
                  <Icon icon="lucideX" />
                </Pressable>
              </Dialog.Close>
            </XStack>
            <ScrollView margin={0}>
              <YStack width="100%" alignItems="center">
                <ShiftDetailsSubheader
                  startDate={shift.start_time}
                  endDate={shift.end_time}
                  session={shift.eventSessions[0] as Session}
                />
                <YStack width="90%">
                  <ShiftDetailCard shift={shift} />
                </YStack>
              </YStack>
            </ScrollView>
          </Dialog.Content>
        </ThemeProvider>
      </Dialog.Portal>
    </Dialog>
  )
}

export { ShiftCard }

const $closeButtonStyles = {
  position: "absolute" as const,
  right: 16,
}

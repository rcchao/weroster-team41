import { Pressable } from "react-native"
import { format } from "date-fns"
import { Circle, useTheme, XStack, YStack, Card, Dialog, ScrollView } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { ThemeProvider } from "@/theme/context"
import { getInitials } from "@/utils/nameFormatting"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"
import { Lozenge, LozengeType } from "./Lozenge"
import { $closeButtonStyles } from "./ShiftCard"
import { SwapDetailCard, TeamMemberButton } from "./ShiftDetailCard"
import { ShiftDetailsSubheader } from "./ShiftDetailsSubheader"

type MessageContext = {
  initials: string
  eventDateStr?: string | null
  eventLocation?: string | null
}

type NotificationRequestType = "LEAVE" | "SWAP" | "ASSIGNMENT"

export type SwapStatusType = "APPROVED" | "DECLINED" | "AWAITING"
export type NotificationStatusType = "APPROVED" | "DECLINED"

type StatusByRequest = {
  LEAVE: "APPROVED" | "DECLINED"
  ASSIGNMENT: "APPROVED" | "DECLINED"
  SWAP: "APPROVED" | "DECLINED" | "AWAITING"
}

type NotificationConfig = {
  request: LozengeType
  status?: LozengeType
  message: (context: MessageContext) => string | null
}

type NotificationConfigMap = {
  [R in NotificationRequestType]: { [S in StatusByRequest[R]]: NotificationConfig }
}

// Nested config
const NOTIFICATION_CONFIG: NotificationConfigMap = {
  SWAP: {
    AWAITING: {
      request: "SWAP",
      message: ({ initials, eventDateStr }) =>
        `You have been offered a shift swap by ${initials} for ${eventDateStr}.`,
    },
    APPROVED: {
      request: "SWAP",
      status: "APPROVED",
      message: ({ initials }) => `Your request to swap a shift with ${initials} has been accepted.`,
    },
    DECLINED: {
      request: "SWAP",
      status: "DECLINED",
      message: ({ initials }) => `Your request to swap a shift with ${initials} has been declined.`,
    },
  },

  LEAVE: {
    APPROVED: {
      request: "LEAVE",
      status: "APPROVED",
      message: ({ eventDateStr }) => `Your leave on ${eventDateStr} has been approved.`,
    },
    DECLINED: {
      request: "LEAVE",
      status: "DECLINED",
      message: ({ eventDateStr }) => `Your leave on ${eventDateStr} has been declined.`,
    },
  },

  ASSIGNMENT: {
    APPROVED: {
      request: "ASSIGNMENT",
      status: "APPROVED",
      message: ({ eventDateStr, eventLocation }) =>
        `Your request for the open shift at ${eventLocation} on ${eventDateStr} has been accepted.`,
    },
    DECLINED: {
      request: "ASSIGNMENT",
      status: "DECLINED",
      message: ({ eventDateStr, eventLocation }) =>
        `Your request for the open shift at ${eventLocation} on ${eventDateStr} has been declined.`,
    },
  },
}

type BaseFields = {
  notificationDate: Date
  fromUserFirstName?: string
  fromUserLastName?: string
  eventDate?: Date
  eventLocation?: string
  isRead: boolean
  requiresAction: boolean
  userId?: number
  toUserId?: number
  swapInitiator?: number
}

// Generic props bind request/status to the valid pair
type NotificationProps<R extends NotificationRequestType> = BaseFields & {
  requestType: R
  statusType: StatusByRequest[R]
}

const NotificationBody = <R extends NotificationRequestType>({
  requestType,
  statusType,
  notificationDate,
  fromUserFirstName,
  fromUserLastName,
  eventDate,
  eventLocation,
  isRead,
  requiresAction,
  userId,
  toUserId,
  swapInitiator,
}: NotificationProps<R>) => {
  const theme = useTheme()
  const { request, status, message } = NOTIFICATION_CONFIG[requestType][statusType]

  const bgColorToken = requiresAction ? "$secondary100" : "$white100"
  const bgColor = theme[bgColorToken]?.val

  const displayNotificationDate = format(notificationDate, "dd/MM/yy - HH:mm")
  const displayTargetDate = eventDate ? format(eventDate, "EEE, d MMM yyyy") : null
  const initials = getInitials(fromUserFirstName, fromUserLastName)

  let text = message({
    initials,
    eventDateStr: displayTargetDate,
    eventLocation: eventLocation,
  })

  if (userId !== swapInitiator && userId === toUserId && !requiresAction) {
    text = `You have ${status === "APPROVED" ? `accepted` : `declined`} a swap shift request by ${initials}.`
  }

  return (
    <XStack
      paddingBlock={15}
      paddingInline={20}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={bgColor}
    >
      <YStack width="90%" gap="$3">
        <BodyText variant="body2">{text}</BodyText>

        <XStack gap="$3" flex={1} alignItems="center">
          <Lozenge type={request} />
          {status && <Lozenge type={status} />}
          <YStack marginLeft="auto">
            <BodyText variant="body3" color="$mono400">
              {displayNotificationDate}
            </BodyText>
          </YStack>
        </XStack>
      </YStack>

      {isRead === false && (
        <Circle width={10} height={10} backgroundColor="$accent600" borderRadius="$full" />
      )}
    </XStack>
  )
}

export const Notification = <R extends NotificationRequestType>(props: NotificationProps<R>) => {
  return <NotificationBody {...props} />
}

type InteractiveNotificationProps = BaseFields & {
  requestType: "SWAP"
  statusType: StatusByRequest["SWAP"] // "APPROVED" | "DECLINED" | "AWAITING"
  shift: ShiftWithNumUsers
  message: string | null
  swapNotifId: number
}

export const InteractiveNotification = ({ shift, ...props }: InteractiveNotificationProps) => {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Card>
          <NotificationBody {...props} />
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
            <YStack height="100%">
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
              <ScrollView margin={0} flex={1}>
                <YStack width="100%">
                  <XStack alignItems="center" padding={15} justifyContent="flex-start">
                    <HeaderText variant="h3">From</HeaderText>
                    <TeamMemberButton
                      name={props.fromUserFirstName + " " + props.fromUserLastName}
                    />
                  </XStack>
                  <YStack alignItems="center">
                    <ShiftDetailsSubheader
                      startDate={shift.start_time}
                      endDate={shift.end_time}
                      session="AM"
                    />
                    <YStack width="90%" paddingBlockEnd={20}>
                      <SwapDetailCard
                        shift={shift}
                        message={props.message}
                        requiresAction={props.requiresAction}
                        isAccepted={props.statusType === "APPROVED"}
                        swapNotifId={props.swapNotifId}
                        swapInitiator={props.swapInitiator}
                      />
                    </YStack>
                  </YStack>
                </YStack>
              </ScrollView>
            </YStack>
          </Dialog.Content>
        </ThemeProvider>
      </Dialog.Portal>
    </Dialog>
  )
}

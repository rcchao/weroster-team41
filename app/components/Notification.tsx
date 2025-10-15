import { Pressable } from "react-native"
import { format } from "date-fns"
import { Circle, useTheme, XStack, YStack, Card, Dialog, ScrollView } from "tamagui"

import { ThemeProvider } from "@/theme/context"
import { getInitials } from "@/utils/nameFormatting"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"
import { Lozenge, LozengeType } from "./Lozenge"
import { $closeButtonStyles } from "./ShiftCard"
import { ShiftDetailsSubheader } from "./ShiftDetailsSubheader"
// import { ShiftDetailCard } from "./ShiftDetailCard"

type MessageContext = {
  initials: string
  targetDateStr?: string | null
}

type NotificationType =
  | "leaveApproved"
  | "leaveDeclined"
  | "openShiftAccepted"
  | "openShiftDeclined"

type SwapNotificationType = "swapOffer" | "swapAccepted" | "swapDeclined"

type AnyNotificationType = NotificationType | SwapNotificationType

type NotificationConfig = {
  requestType: LozengeType
  statusType?: LozengeType
  backgroundColor?: string
  message: (context: MessageContext) => string | null
}

const NOTIFICATION_CONFIG: Record<AnyNotificationType, NotificationConfig> = {
  swapOffer: {
    requestType: "swap",
    backgroundColor: "$secondary100",
    message: ({ initials, targetDateStr }) =>
      `You have a new shift swap offer from ${initials}${
        targetDateStr ? ` for ${targetDateStr}` : ""
      }.`,
  },
  swapAccepted: {
    requestType: "swap",
    statusType: "APPROVED",
    message: ({ initials }) => `Your request to swap a shift with ${initials} has been accepted.`,
  },
  swapDeclined: {
    requestType: "swap",
    statusType: "DECLINED",
    message: ({ initials }) => `Your request to swap a shift with ${initials} has been declined.`,
  },
  leaveApproved: {
    requestType: "leave",
    statusType: "APPROVED",
    message: ({ targetDateStr }) =>
      `Your leave${targetDateStr ? ` on ${targetDateStr}` : ""} has been approved.`,
  },
  leaveDeclined: {
    requestType: "leave",
    statusType: "DECLINED",
    message: ({ targetDateStr }) =>
      `Your leave${targetDateStr ? ` on ${targetDateStr}` : ""} has been declined.`,
  },
  openShiftAccepted: {
    requestType: "openShift",
    statusType: "APPROVED",
    message: ({ targetDateStr }) =>
      `Your request for shift${targetDateStr ? ` ${targetDateStr}` : ""} has been accepted.`,
  },
  openShiftDeclined: {
    requestType: "openShift",
    statusType: "DECLINED",
    message: ({ targetDateStr }) =>
      `Your request for shift${targetDateStr ? ` ${targetDateStr}` : ""} has been declined.`,
  },
}

// Generic used so the notification type can be specified depending on base or interactive
interface NotificationBaseProps<TType extends AnyNotificationType> {
  type: TType
  notificationDate: Date
  fromUserFirstName?: string
  fromUserLastName?: string
  targetDate?: Date
}

const NotificationBody = ({
  type,
  notificationDate,
  fromUserFirstName,
  fromUserLastName,
  targetDate,
}: NotificationBaseProps<AnyNotificationType>) => {
  const theme = useTheme()
  const { requestType, statusType, backgroundColor, message } = NOTIFICATION_CONFIG[type]

  const bgColorToken = backgroundColor ?? "$white200"
  const bgColor = theme[bgColorToken]?.val

  const displayNotificationDate = format(notificationDate, "dd/MM/yy - HH:mm")
  const displayTargetDate = targetDate ? format(targetDate, "EEE, d MMM yyyy") : null
  const initials = getInitials(fromUserFirstName, fromUserLastName)

  const text = message({ initials, targetDateStr: displayTargetDate })

  const hasBlueDot = true

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
          <Lozenge type={requestType} />
          {statusType && <Lozenge type={statusType} />}
          <YStack marginLeft="auto">
            <BodyText variant="body3" color="$mono400">
              {displayNotificationDate}
            </BodyText>
          </YStack>
        </XStack>
      </YStack>

      {hasBlueDot && (
        <Circle width={10} height={10} backgroundColor="$accent600" borderRadius="$full" />
      )}
    </XStack>
  )
}

export const Notification = (props: NotificationBaseProps<NotificationType>) => {
  return <NotificationBody {...props} />
}

// Will pass shift in here to display the details in the modal
interface InteractiveNotificationProps extends NotificationBaseProps<SwapNotificationType> {
  disabled?: boolean
}

// Will turn this into a tamagui Dialog component
export const InteractiveNotification = ({ ...props }: InteractiveNotificationProps) => {
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
                <YStack width="100%" alignItems="center">
                  <ShiftDetailsSubheader startDate={new Date()} endDate={new Date()} session="AM" />
                  <YStack width="90%" paddingBlockEnd={20}>
                    {/* <ShiftDetailCard shift={shift} onPress={onPress} /> */}
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

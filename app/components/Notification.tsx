import { format } from "date-fns"
import { Circle, useTheme, XStack, YStack } from "tamagui"

import { getInitials } from "@/utils/nameFormatting"

import { BodyText } from "./BodyText"
import { Lozenge, LozengeType } from "./Lozenge"

type MessageContext = {
  initials: string
  targetDateStr?: string | null
}

type NotificationType =
  | "swapOffer"
  | "swapAccepted"
  | "swapDeclined"
  | "leaveApproved"
  | "leaveDeclined"
  | "openShiftAccepted"
  | "openShiftDeclined"

type NotificationConfig = {
  requestType: LozengeType
  statusType?: LozengeType
  backgroundColor?: string
  message: (context: MessageContext) => string | null
}

const NOTIFICATION_CONFIG: Record<NotificationType, NotificationConfig> = {
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
    message: ({ initials, targetDateStr }) =>
      `Your leave${targetDateStr ? ` on ${targetDateStr}` : ""} has been approved by ${initials}.`,
  },
  leaveDeclined: {
    requestType: "leave",
    statusType: "DECLINED",
    message: ({ initials, targetDateStr }) =>
      `Your leave${targetDateStr ? ` on ${targetDateStr}` : ""} has been declined by ${initials}.`,
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

interface NotificationProps {
  type: NotificationType
  notificationDate: Date
  targetUserFirstName: string
  targetUserLastName: string
  targetDate?: Date // Leave or shift date.
}

export const Notification = ({
  type,
  notificationDate,
  targetUserFirstName,
  targetUserLastName,
  targetDate,
}: NotificationProps) => {
  const theme = useTheme()

  const { requestType, statusType, backgroundColor, message } = NOTIFICATION_CONFIG[type]

  const bgColorString = backgroundColor ?? "$white200"
  const bgColor = theme[bgColorString]?.val

  const displayNotificationDate = format(notificationDate, "dd/MM/yy - HH:mm")
  const displayTargetDate = targetDate ? format(targetDate, "EEE, d MMM yyyy") : null
  const targetUserInitials = getInitials(targetUserFirstName, targetUserLastName)

  const text =
    message?.({
      initials: targetUserInitials,
      targetDateStr: displayTargetDate,
    }) ?? null

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

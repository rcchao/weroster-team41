import { FC } from "react"
import { format } from "date-fns"
import { YStack, Text } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { InteractiveNotification, Notification } from "@/components/Notification"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useSwapNotifications } from "@/services/hooks/useSwapNotifications"
import { $styles } from "@/theme/styles"
import { getInitials } from "@/utils/nameFormatting"

interface NotificationsScreenProps extends AppStackScreenProps<"Notifications"> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = function NotificationsScreen(
  _props,
) {
  const { navigation } = _props
  const { swapNotification } = useSwapNotifications()
  const firstSwapNotif = swapNotification?.[0]

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader title="Notifications" navigation={navigation} />
      <YStack gap="$4" paddingVertical="$10">
        {firstSwapNotif && (
          <Text>
            You have been offered a swap shift by{" "}
            {getInitials(firstSwapNotif.first_name, firstSwapNotif.last_name)} for{" "}
            {format(firstSwapNotif.event.start_time, "EEE, d MMM yyyy")}.{"\n"}
            This notification is {firstSwapNotif.is_read ? "read" : "unread"} and{" "}
            {firstSwapNotif.requires_action ? "requires action" : "does not require an action"}.
            {"\n"}
            This swap is {firstSwapNotif.status}.{"\n"}
            This notification is timestamped at{" "}
            {format(firstSwapNotif.created_at, "dd/MM/yy - HH:mm")}
          </Text>
        )}
      </YStack>
      <Notification
        type="leaveApproved"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <Notification
        type="leaveDeclined"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <InteractiveNotification
        type="swapOffer"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <InteractiveNotification
        type="swapAccepted"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <InteractiveNotification
        type="swapDeclined"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <Notification
        type="openShiftAccepted"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
      <Notification
        type="openShiftDeclined"
        notificationDate={new Date()}
        fromUserFirstName="Jane"
        fromUserLastName="Doe"
        targetDate={new Date()}
      />
    </Screen>
  )
}

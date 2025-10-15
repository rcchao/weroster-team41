import { FC } from "react"
import { format } from "date-fns"
import { XStack, YStack, Spinner } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { InteractiveNotification, Notification } from "@/components/Notification"
import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useUserNotifications } from "@/services/hooks/useUserNotifications"
import { $styles } from "@/theme/styles"

interface NotificationsScreenProps extends AppStackScreenProps<"Notifications"> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = function NotificationsScreen(
  _props,
) {
  const { navigation } = _props
  const { userNotifications, isPending } = useUserNotifications()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader title="Notifications" navigation={navigation} />
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
      <YStack gap="$4" paddingVertical="$4">
        {isPending ? (
          <YStack paddingTop="60%" gap="$3" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <BodyText variant="body2">Loading...</BodyText>
          </YStack>
        ) : userNotifications && userNotifications.length > 0 ? (
          userNotifications.map((notifs, idx) => (
            <XStack key={idx} justifyContent="center">
              <BodyText>
                {" "}
                This is a {String(notifs.notif_type)} notification. {"\n"} This notification is
                timestamped at {format(notifs.created_at, "dd/MM/yy - HH:mm")}. {"\n"} This
                notification is {notifs.is_read ? "read" : "unread"} and{" "}
                {notifs.requires_action ? "requires action" : "does not require an action"}. This
                notification has the status {String(notifs.status)}.
              </BodyText>
              {console.log(idx, notifs)}
            </XStack>
          ))
        ) : (
          <BodyText variant="body4">No requests found</BodyText>
        )}
      </YStack>
    </Screen>
  )
}

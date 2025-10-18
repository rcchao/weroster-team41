import { FC } from "react"
import { YStack, Spinner, ScrollView } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import {
  InteractiveNotification,
  Notification,
  NotificationStatusType,
  SwapStatusType,
} from "@/components/Notification"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useUserNotifications } from "@/services/hooks/useUserNotifications"
import { $styles } from "@/theme/styles"

interface NotificationsScreenProps extends AppStackScreenProps<"Notifications"> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = function NotificationsScreen(
  _props,
) {
  const { navigation } = _props
  const { userNotifications, isPending } = useUserNotifications()

  const { userId } = useAuth()

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$styles.barContainer}>
      <BackHeader title="Notifications" navigation={navigation} />
      <ScrollView height="100%">
        <YStack>
          {isPending ? (
            <YStack paddingTop="60%" gap="$3" alignItems="center">
              <Spinner size="large" color="$primary500" />
              <BodyText variant="body2">Loading...</BodyText>
            </YStack>
          ) : userNotifications && userNotifications.length > 0 ? (
            userNotifications.map((notifs, idx) => (
              <YStack key={idx} justifyContent="center">
                {notifs.notif_type === "SWAP" ? (
                  <InteractiveNotification
                    requestType={notifs.notif_type}
                    statusType={notifs.status as SwapStatusType}
                    notificationDate={notifs.created_at}
                    fromUserFirstName={notifs.first_name || ""}
                    fromUserLastName={notifs.last_name || ""}
                    eventDate={notifs.event.start_time}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requires_action}
                    shift={notifs.event}
                    message={notifs.message}
                    userId={userId}
                    toUserId={notifs.to_user}
                    swapInitiator={notifs.swap_initiator}
                    swapNotifId={notifs.id}
                  />
                ) : notifs.notif_type === "LEAVE" ? (
                  <Notification
                    requestType={notifs.notif_type}
                    statusType={notifs.status as NotificationStatusType}
                    notificationDate={notifs.created_at}
                    eventDate={notifs.leave_start_date}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requires_action}
                  />
                ) : notifs.notif_type === "ASSIGNMENT" ? (
                  <Notification
                    requestType={notifs.notif_type}
                    statusType={notifs.status as NotificationStatusType}
                    notificationDate={notifs.created_at}
                    eventDate={notifs.assignmentRequest_start_date}
                    eventLocation={notifs.location}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requires_action}
                  />
                ) : null}
              </YStack>
            ))
          ) : (
            <BodyText variant="body4">No requests found</BodyText>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  )
}

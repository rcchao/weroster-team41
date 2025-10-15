import { FC } from "react"
import { YStack, Spinner, ScrollView } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { InteractiveNotification, Notification } from "@/components/Notification"
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
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$styles.barContainer}>
      <BackHeader title="Notifications" navigation={navigation} />
      <ScrollView>
        <BodyText variant="body3">{JSON.stringify(userNotifications)}</BodyText>
        <YStack paddingVertical="$4">
          {isPending ? (
            <YStack paddingTop="60%" gap="$3" alignItems="center">
              <Spinner size="large" color="$primary500" />
              <BodyText variant="body2">Loading...</BodyText>
            </YStack>
          ) : userNotifications && userNotifications.length > 0 ? (
            userNotifications.map((notifs, idx) => (
              <YStack key={idx} justifyContent="center">
                {/* <BodyText>
                  {" "}
                  This is a {String(notifs.notif_type)} notification. {"\n"} This notification is
                  timestamped at {format(notifs.created_at, "dd/MM/yy - HH:mm")}. {"\n"} This
                  notification is {notifs.is_read ? "read" : "unread"} and{" "}
                  {notifs.requires_action ? "requires action" : "does not require an action"}. This
                  notification has the status {String(notifs.status)}.
                </BodyText> */}
                {notifs.notif_type === "SWAP" ? (
                  <InteractiveNotification
                    requestType={notifs.notif_type}
                    statusType={notifs.status}
                    notificationDate={notifs.created_at}
                    fromUserFirstName={notifs.first_name || ""}
                    fromUserLastName={notifs.last_name || ""}
                    eventDate={notifs.event.start_time}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requires_action}
                    shift={notifs.event}
                  />
                ) : notifs.notif_type === "LEAVE" ? (
                  <Notification
                    requestType={notifs.notif_type}
                    statusType={notifs.status}
                    notificationDate={notifs.created_at}
                    eventDate={notifs.leave_start_date}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requireAction}
                  />
                ) : notifs.notif_type === "ASSIGNMENT" ? (
                  <Notification
                    requestType={notifs.notif_type}
                    statusType={notifs.status}
                    notificationDate={notifs.created_at}
                    eventDate={notifs.assignmentRequest_start_date}
                    eventLocation={notifs.location}
                    isRead={notifs.is_read}
                    requiresAction={notifs.requireAction}
                  />
                ) : null}
                {console.log(idx, notifs)}
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

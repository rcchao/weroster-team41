import { FC } from "react"

import { BackHeader } from "@/components/BackHeader"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"

interface NotificationsScreenProps extends AppStackScreenProps<"Notifications"> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = function NotificationsScreen(
  _props,
) {
  const { navigation } = _props

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <BackHeader title="Notifications" navigation={navigation} />
      <Text preset="heading" tx="notificationScreen:title" />
    </Screen>
  )
}

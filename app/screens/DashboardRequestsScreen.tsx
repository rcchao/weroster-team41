import { FC } from "react"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { $styles } from "@/theme/styles"

export const DashboardRequestsScreen: FC<DashboardTabScreenProps<"DashboardRequests">> = (
  _props,
) => {
  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="dashboardRequestsScreen:title" />
    </Screen>
  )
}

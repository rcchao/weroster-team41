import { FC } from "react"

import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useUserRequests } from "@/services/hooks/useUserRequests"
import { $styles } from "@/theme/styles"

export const DashboardRequestsScreen: FC<DashboardTabScreenProps<"DashboardRequests">> = (
  _props,
) => {
  // Harcoded values for demonstration
  const month = 1
  const year = 2025
  const { userRequests } = useUserRequests(month, year)
  console.log(JSON.stringify(userRequests))

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="dashboardRequestsScreen:title" />
      <BodyText variant="body4">
        {userRequests ? JSON.stringify(userRequests) : "Loading..."}
      </BodyText>
    </Screen>
  )
}

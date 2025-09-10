// placeholder blank screen for now
import { FC } from "react"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"

export const DashboardEditScreen: FC<AppStackScreenProps<"EditDashboard">> =
  function DashboardEditScreen() {
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]}>
        <Text preset="heading">Dashboard Editor Screen</Text>
      </Screen>
    )
  }

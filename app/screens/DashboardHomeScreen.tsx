import { FC, ReactElement } from "react"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { $styles } from "@/theme/styles"
import type { Theme } from "@/theme/types"

export interface Demo {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}

export const DashboardHomeScreen: FC<DemoTabScreenProps<"DashboardHome">> =
  function DashboardHomeScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="dashboardHomeScreen:jumpStart" />
      </Screen>
    )
  }

import { FC } from "react"
import { TextStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export const DashboardRosterScreen: FC<DashboardTabScreenProps<"DashboardRoster">> =
  function DashboardRosterScreen(_props) {
    const { themed } = useAppTheme()

    return (
      <Screen preset="scroll">
        <Text preset="heading" tx="dashboardRosterScreen:title" style={themed($title)} />
        <Text tx="dashboardRosterScreen:externalLinkText" style={themed($description)} />
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

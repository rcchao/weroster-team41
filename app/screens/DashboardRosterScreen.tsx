import { FC } from "react"
import { TextStyle } from "react-native"

import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

export const DashboardRosterScreen: FC<DashboardTabScreenProps<"DashboardRoster">> =
  function DashboardRosterScreen(_props) {
    const { themed } = useAppTheme()

    return (
      <Screen preset="scroll">
        <Text preset="heading" tx="dashboardRosterScreen:title" style={themed($title)} />
        <Text tx="dashboardRosterScreen:externalLinkText" style={themed($description)} />

        <ListItem
          tx="dashboardRosterScreen:externalLink"
          leftIcon="anchor"
          rightIcon={isRTL ? "left" : "right"}
          onPress={() => openLinkInBrowser("https://community.infinite.red/")}
        />
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

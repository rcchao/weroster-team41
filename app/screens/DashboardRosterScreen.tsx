import { FC, useLayoutEffect, useState } from "react"
import { SafeAreaView, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { SubTabs } from "@/components/SubTabs"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const TABS = [
  { key: "myRoster", label: "My Roster" },
  { key: "teamRoster", label: "Team Roster" },
  { key: "openShifts", label: "Open Shifts" },
] as const

export const DashboardRosterScreen: FC<DashboardTabScreenProps<"DashboardRoster">> =
  function DashboardRosterScreen(_props) {
    const { themed } = useAppTheme()

    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("myRoster")

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <SafeAreaView>
            <SubTabs
              tabs={TABS as unknown as { key: string; label: string }[]}
              activeTab={activeTab}
              onTabChange={(k) => setActiveTab(k as typeof activeTab)}
            />
          </SafeAreaView>
        ),
      })
    }, [navigation, activeTab])

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container}>
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

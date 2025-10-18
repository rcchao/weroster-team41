import { memo, useMemo } from "react"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { View } from "tamagui"

import { SubTabs } from "@/components/SubTabs"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"

type TabKey = "myRoster" | "teamRoster" | "openShifts"
type RosterRouteName = keyof RosterStackParamList

const TABS: ReadonlyArray<{ key: TabKey; label: string; route: RosterRouteName }> = [
  { key: "myRoster", label: "My Roster", route: "MyRoster" },
  { key: "teamRoster", label: "Team Roster", route: "TeamRoster" },
  { key: "openShifts", label: "Open Shifts", route: "OpenShifts" },
] as const

const HEADER_CONTENT_HEIGHT = 110

const $header: React.CSSProperties = {
  height: HEADER_CONTENT_HEIGHT,
}

function RosterHeaderInner() {
  const navigation = useNavigation<NativeStackNavigationProp<RosterStackParamList>>()
  const route = useRoute<RouteProp<Record<string, object | undefined>, string>>()

  const tabs = useMemo(() => TABS, [])

  const activeTab: TabKey =
    (tabs.find((t) => t.route === (route.name as RosterRouteName))?.key as TabKey) ?? "myRoster"

  const handleTabChange = (k: string) => {
    const tab = tabs.find((t) => t.key === (k as TabKey))
    if (tab) navigation.navigate(tab.route)
  }

  return (
    <View style={$header}>
      <SubTabs tabs={tabs as any} activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  )
}

export const RosterHeader = memo(RosterHeaderInner)

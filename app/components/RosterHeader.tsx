import { memo, useLayoutEffect, useMemo, useState } from "react"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View } from "tamagui"

import { SubTabs } from "@/components/SubTabs"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"

type TabKey = "myRoster" | "teamRoster" | "openShifts"
type RosterRouteName = keyof RosterStackParamList

const ROUTE_BY_TAB: Record<TabKey, RosterRouteName> = {
  myRoster: "MyRoster",
  teamRoster: "TeamRoster",
  openShifts: "OpenShifts",
}

const TAB_BY_ROUTE: Record<RosterRouteName, TabKey> = {
  MyRoster: "myRoster",
  TeamRoster: "teamRoster",
  OpenShifts: "openShifts",
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "myRoster", label: "My Roster" },
  { key: "teamRoster", label: "Team Roster" },
  { key: "openShifts", label: "Open Shifts" },
]

const HEADER_CONTENT_HEIGHT = 40

const $header = (top: number) => ({
  height: top + HEADER_CONTENT_HEIGHT,
  paddingTop: top,
  justifyContent: "center" as const,
})

function RosterHeaderInner() {
  const navigation = useNavigation<NativeStackNavigationProp<RosterStackParamList>>()
  const route = useRoute<RouteProp<Record<string, object | undefined>, string>>()

  const [activeTab, setActiveTab] = useState<TabKey>("myRoster")

  const { top } = useSafeAreaInsets()

  useLayoutEffect(() => {
    const name = route.name as RosterRouteName | undefined
    if (name) {
      const next = TAB_BY_ROUTE[name]
      setActiveTab((prev) => (prev === next ? prev : next))
    }
  }, [route.name])

  const tabs = useMemo(() => TABS, [])

  const handleTabChange = (k: string) => {
    const key = k as TabKey
    navigation.navigate(ROUTE_BY_TAB[key])
  }

  return (
    <View style={$header(top)}>
      <SubTabs tabs={tabs as any} activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  )
}

export const RosterHeader = memo(RosterHeaderInner)

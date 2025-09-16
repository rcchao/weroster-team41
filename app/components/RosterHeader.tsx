import { memo, useLayoutEffect, useMemo, useState } from "react"
import { SafeAreaView } from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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

function RosterHeaderInner() {
  const navigation = useNavigation<NativeStackNavigationProp<RosterStackParamList>>()
  const route = useRoute<RouteProp<Record<string, object | undefined>, string>>()

  const [activeTab, setActiveTab] = useState<TabKey>("myRoster")

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
    navigation.replace(ROUTE_BY_TAB[key])
  }

  return (
    <SafeAreaView>
      <SubTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  )
}

export const RosterHeader = memo(RosterHeaderInner)

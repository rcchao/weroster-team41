import { useLayoutEffect, useState } from "react"
import { SafeAreaView } from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { SubTabs } from "@/components/SubTabs"
import type { RosterStackParamList } from "@/navigators/DashboardNavigator"

type TabKey = "myRoster" | "teamRoster" | "openShifts"
type RosterRouteName = keyof RosterStackParamList

const ROUTE_BY_TAB = {
  myRoster: "MyRoster",
  teamRoster: "TeamRoster",
  openShifts: "OpenShifts",
} as const

const TAB_BY_ROUTE: Record<keyof RosterStackParamList, keyof typeof ROUTE_BY_TAB> = {
  MyRoster: "myRoster",
  TeamRoster: "teamRoster",
  OpenShifts: "openShifts",
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "myRoster", label: "My Roster" },
  { key: "teamRoster", label: "Team Roster" },
  { key: "openShifts", label: "Open Shifts" },
]

export function useRosterHeader() {
  // Type the navigation with the roster child stack so navigate() is correct
  const navigation = useNavigation<NativeStackNavigationProp<RosterStackParamList>>()
  const route = useRoute<RouteProp<Record<string, object | undefined>, string>>()
  const [activeTab, setActiveTab] = useState<keyof typeof ROUTE_BY_TAB>("myRoster")

  useLayoutEffect(() => {
    const name = route.name as RosterRouteName | undefined
    if (name && TAB_BY_ROUTE[name]) {
      setActiveTab(TAB_BY_ROUTE[name])
    }
  }, [route.name])

  const handleTabChange = (k: string) => {
    const key = k as TabKey
    const target = ROUTE_BY_TAB[key]
    navigation.replace(target)
  }

  return (
    <SafeAreaView>
      <SubTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  )
}

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"

import { BottomTabs, BottomNavBarItem } from "@/components/BottomTabs"

export const BottomDashboardNavBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const items: BottomNavBarItem[] = state.routes.map((route, index) => {
    const { options } = descriptors[route.key]
    const active = state.index === index

    const label = (options.tabBarLabel ?? route.name) as string
    const icon =
      typeof options.tabBarIcon === "function"
        ? options.tabBarIcon({ focused: active, color: "", size: 22 })
        : null

    return {
      key: route.key,
      label,
      icon,
      active,
    }
  })

  const onTabChange = (key: string) => {
    const index = state.routes.findIndex((r) => r.key === key)
    const route = state.routes[index]
    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true })
    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route.name as never)
    }
  }

  return <BottomTabs items={items} onTabChange={onTabChange} />
}

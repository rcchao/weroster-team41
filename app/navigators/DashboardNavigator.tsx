import { TextStyle, ViewStyle } from "react-native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "tamagui"

import { BottomDashboardNavBar } from "@/components/BottomDashboardNavBar"
import { Icon } from "@/components/Icon"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { DashboardHomeScreen } from "@/screens/DashboardHomeScreen"
import { DashboardRequestsScreen } from "@/screens/DashboardRequestsScreen"
import { DashboardTeamsScreen } from "@/screens/DashboardTeamsScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { DashboardRosterScreen, RosterStackParamList } from "./RosterStackNavigator"

export type DashboardTabParamList = {
  DashboardRoster: NavigatorScreenParams<RosterStackParamList>
  DashboardHome: { queryIndex?: string; itemIndex?: string }
  DashboardTeams: undefined
  DashboardRequests: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DashboardTabScreenProps<T extends keyof DashboardTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DashboardTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DashboardTabParamList>()

/**
 * This is the main navigator for the dashboard screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DashboardNavigator`.
 */
export function DashboardNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const theme = useTheme()

  return (
    <EpisodeProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: themed($tabBarLabel),
          tabBarItemStyle: themed($tabBarItem),
        }}
        tabBar={(props) => <BottomDashboardNavBar {...props} />}
      >
        <Tab.Screen
          name="DashboardHome"
          component={DashboardHomeScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:homeTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="house"
                color={focused ? theme.accent500.val : theme.white100.val}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="DashboardRoster"
          component={DashboardRosterScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:rosterTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="roster"
                color={focused ? theme.accent500.val : theme.white100.val}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="DashboardRequests"
          component={DashboardRequestsScreen}
          options={{
            tabBarAccessibilityLabel: translate("dashboardNavigator:requestsTab"),
            tabBarLabel: translate("dashboardNavigator:requestsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="requests"
                color={focused ? theme.accent500.val : theme.white100.val}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="DashboardTeams"
          component={DashboardTeamsScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:teamsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="teams"
                color={focused ? theme.accent500.val : theme.white100.val}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </EpisodeProvider>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.regular,
  lineHeight: 16,
  color: colors.text,
})
export { RosterStackParamList }

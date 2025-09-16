import { TextStyle, ViewStyle } from "react-native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { RosterHeader } from "@/components/RosterHeader"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { DashboardHomeScreen } from "@/screens/DashboardHomeScreen"
import { DashboardRequestsScreen } from "@/screens/DashboardRequestsScreen"
import { DashboardTeamsScreen } from "@/screens/DashboardTeamsScreen"
import { MyRosterScreen } from "@/screens/MyRosterScreen"
import { OpenShiftsScreen } from "@/screens/OpenShiftsScreen"
import { TeamRosterScreen } from "@/screens/TeamRosterScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type RosterStackParamList = {
  MyRoster: undefined
  TeamRoster: undefined
  OpenShifts: undefined
}

const RosterStack = createNativeStackNavigator<RosterStackParamList>()

function DashboardRosterScreen() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <RosterStack.Navigator
      initialRouteName="MyRoster"
      screenOptions={{
        headerShown: true,
        header: () => <RosterHeader />,
        contentStyle: { backgroundColor: colors.background },
        animation: "none",
        gestureEnabled: false,
      }}
    >
      <RosterStack.Screen name="MyRoster" component={MyRosterScreen} />
      <RosterStack.Screen name="TeamRoster" component={TeamRosterScreen} />
      <RosterStack.Screen name="OpenShifts" component={OpenShiftsScreen} />
    </RosterStack.Navigator>
  )
}

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
      >
        <Tab.Screen
          name="DashboardHome"
          component={DashboardHomeScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:homeTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="house" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DashboardRoster"
          component={DashboardRosterScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:rosterTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="roster" color={focused ? colors.tint : colors.tintInactive} size={30} />
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
              <Icon icon="requests" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DashboardTeams"
          component={DashboardTeamsScreen}
          options={{
            tabBarLabel: translate("dashboardNavigator:teamsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="teams" color={focused ? colors.tint : colors.tintInactive} size={30} />
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
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})

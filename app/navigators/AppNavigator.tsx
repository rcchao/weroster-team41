/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { DashboardEditScreen } from "@/screens/DashboardEditScreen"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { LoginScreen } from "@/screens/LoginScreen"
import { NotificationsScreen } from "@/screens/NotificationsScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { SwapShiftScreen } from "@/screens/SwapShiftScreen"
import { TeamDetailsScreen } from "@/screens/TeamDetailsScreen"
import { useAppTheme } from "@/theme/context"

import { DashboardNavigator, DashboardTabParamList } from "./DashboardNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Login: undefined
  Dashboard: NavigatorScreenParams<DashboardTabParamList>
  Notifications: undefined
  EditDashboard: undefined
  ProfileScreen: undefined
  TeamDetails: { userId: number }
  SwapShift: { shiftId: number; teamIds: number[] }
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const { isAuthenticated } = useAuth()

  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? "Dashboard" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
          <Stack.Screen name="EditDashboard" component={DashboardEditScreen} />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              presentation: "fullScreenModal",
              animation: "fade",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          presentation: "card",
          animation: "none",
        }}
      />

      <Stack.Screen
        name="TeamDetails"
        component={TeamDetailsScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />

      <Stack.Screen
        name="SwapShift"
        component={SwapShiftScreen}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}

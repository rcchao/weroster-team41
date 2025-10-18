/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"

import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import { PortalProvider } from "@tamagui/portal"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import Toast, { ToastConfig } from "react-native-toast-message"
import { TamaguiProvider, XStack } from "tamagui"

import { BodyText } from "./components/BodyText"
import { StyledIcon } from "./components/common/StyledIcon"
import { AuthProvider } from "./context/AuthContext"
import { initI18n } from "./i18n"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import tamaguiConfig from "./tamagui.config"
import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
const queryClient = new QueryClient()

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Dashboard: {
      screens: {
        DashboardHome: {
          path: "home/:queryIndex?/:itemIndex?",
        },
        DashboardTeams: "debug",
        DashboardRequests: "podcast",
        DashboardRoster: "roster",
      },
    },
    Notifications: {
      path: "notifications",
    },
  },
}

const toastConfig: ToastConfig = {
  success: ({ text1 }) => {
    const displayText = text1 ? text1 : "Action was successful"

    return (
      <XStack
        height={44}
        backgroundColor="$white100"
        alignItems="center"
        justifyContent="center"
        borderRadius="$radius.7"
        gap="$3"
        paddingInline="$5"
      >
        <StyledIcon icon="check" />
        <BodyText>{displayText}</BodyText>
      </XStack>
    )
  },

  failure: ({ text1 }) => {
    const displayText = text1 ? text1 : "Action was unsuccessful"

    return (
      <XStack
        height={44}
        backgroundColor="$white100"
        alignItems="center"
        justifyContent="center"
        borderRadius="$radius.7"
        gap="$3"
        paddingInline="$5"
      >
        <StyledIcon icon="lucideX" />
        <BodyText>{displayText}</BodyText>
      </XStack>
    )
  },
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isNavigationStateRestored || !isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <PortalProvider shouldAddRootHost>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <KeyboardProvider>
                <ThemeProvider>
                  <AppNavigator
                    linking={linking}
                    initialState={initialNavigationState}
                    onStateChange={onNavigationStateChange}
                  />
                  <Toast topOffset={60} visibilityTime={1500} config={toastConfig} />
                </ThemeProvider>
              </KeyboardProvider>
            </SafeAreaProvider>
          </PortalProvider>
        </TamaguiProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

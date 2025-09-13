import { FC, ReactElement } from "react"
import { Pressable } from "react-native"
import { View } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { $topRightIcons, $headerIcons } from "@/theme/styles"
import { $container, $fabButton } from "@/theme/styles"
import type { Theme } from "@/theme/types"

export interface Dashboard {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}

export const DashboardHomeScreen: FC<DashboardTabScreenProps<"DashboardHome">> =
  function DashboardHomeScreen(_props) {
    const { navigation } = _props
    const { themed } = useAppTheme()

    return (
      <View style={$container}>
        <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
          <View style={themed($topRightIcons)}>
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={themed($headerIcons)}
            >
              <Icon icon="anchor" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("ProfileScreen")}
              style={themed($headerIcons)}
            >
              <Icon icon="anchor" />
            </Pressable>
          </View>
          <Text preset="heading" tx="dashboardHomeScreen:jumpStart" />
        </Screen>

        {/* FAB positioned relative to the outer View */}
        <Button
          style={themed($fabButton)}
          // navigates to blank edit screen for now
          onPress={() => navigation.getParent()?.navigate("EditDashboard")}
        >
          <Icon icon="edit" size={18} color="black" />
        </Button>
      </View>
    )
  }

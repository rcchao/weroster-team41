import { FC, ReactElement } from "react"
import { Pressable } from "react-native"
import { View } from "react-native"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { $topRightIcons, $headerIcons } from "@/theme/styles"
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
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <View style={themed($topRightIcons)}>
          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={themed($headerIcons)}
          >
            <Icon icon="anchor" /> {/*placeholder icon*/}
          </Pressable>
        </View>
        <Text preset="heading" tx="dashboardHomeScreen:jumpStart" />
      </Screen>
    )
  }

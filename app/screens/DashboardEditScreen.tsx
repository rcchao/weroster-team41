// placeholder blank screen for now
import { FC } from "react"
import { Pressable } from "react-native"
import { View } from "react-native"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import { $topRightIcons, $headerIcons } from "@/theme/styles"

export const DashboardEditScreen: FC<AppStackScreenProps<"EditDashboard">> =
  function DashboardEditScreen(_props) {
    const { navigation } = _props
    const { themed } = useAppTheme()

    return (
      <Screen preset="scroll" safeAreaEdges={["top"]}>
        <View style={themed($topRightIcons)}>
          <Pressable onPress={() => navigation.goBack()} style={themed($headerIcons)}>
            <Icon icon="anchor" />
          </Pressable>
        </View>
        <Text preset="heading">Dashboard Editor Screen</Text>
      </Screen>
    )
  }

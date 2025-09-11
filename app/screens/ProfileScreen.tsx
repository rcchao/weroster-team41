import { FC } from "react"
import { Pressable } from "react-native"
import { View } from "react-native"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import { $topRightIcons, $headerIcons } from "@/theme/styles"
import { $styles } from "@/theme/styles"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <View style={themed($topRightIcons)}>
        <Pressable onPress={() => navigation.goBack()} style={themed($headerIcons)}>
          <Icon icon="anchor" />
        </Pressable>
      </View>
      <Text preset="heading" tx="profileScreen:title" />
    </Screen>
  )
}

export default ProfileScreen

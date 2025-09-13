import { Pressable } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme, XStack, Text, H6 } from "tamagui"

import { BaseTopBar } from "./BaseTopBar"
import { Icon } from "./Icon"

interface BackHeaderProps {
  navigation: NativeStackNavigationProp<any, any>
  title: string
  onSavePress?: () => void
}

const BackHeader = ({ navigation, title, onSavePress }: BackHeaderProps) => {
  const theme = useTheme()

  return (
    <BaseTopBar>
      <XStack alignItems="center" gap="$4">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon color={theme.white100.val} icon="left" />
        </Pressable>
        <H6 color={theme.white100.val}>{title}</H6>
      </XStack>

      {onSavePress && (
        <Pressable onPress={onSavePress}>
          <Text color={theme.white100.val} mx="$4">
            Save
          </Text>
        </Pressable>
      )}
    </BaseTopBar>
  )
}

export { BackHeader }

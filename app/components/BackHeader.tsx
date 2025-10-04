import { useState } from "react"
import { Pressable } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme, XStack } from "tamagui"

import { HeaderText } from "@/components/HeaderText"

import { BaseTopBar } from "./BaseTopBar"
import { Icon } from "./Icon"

interface BackHeaderProps {
  navigation: NativeStackNavigationProp<any, any>
  title: string
  onSavePress?: () => void | Promise<void>
}

const BackHeader = ({ navigation, title, onSavePress }: BackHeaderProps) => {
  const theme = useTheme()
  const [isSaving, setIsSaving] = useState(false)

  const handleSavePress = async () => {
    // Prevent multiple clicks while saving
    if (isSaving) return

    setIsSaving(true)

    try {
      // Wait for the save operation to complete
      await onSavePress?.()

      // Only navigate back after successful save
      navigation.goBack()
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BaseTopBar>
      <XStack alignItems="center" gap="$4">
        <Pressable testID="back-button" onPress={() => navigation.goBack()}>
          <Icon testID="back-icon" color={theme.white100.val} icon="left" />
        </Pressable>
        <HeaderText variant="h2" color={theme.white100.val}>
          {title}
        </HeaderText>
      </XStack>

      {onSavePress && (
        <Pressable
          testID="save-button"
          onPress={handleSavePress}
          disabled={isSaving}
          style={({ pressed }) => ({
            opacity: isSaving ? 0.5 : pressed ? 0.7 : 1,
          })}
        >
          <HeaderText
            variant="h3"
            color={isSaving ? theme.white50?.val || theme.white100.val : theme.white100.val}
            mx="$4"
          >
            {isSaving ? "Saving..." : "Save"}
          </HeaderText>
        </Pressable>
      )}
    </BaseTopBar>
  )
}

export { BackHeader }

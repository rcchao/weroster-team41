import { Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View, XStack, YStack } from "tamagui"

import { HeaderText } from "./HeaderText"

export type BottomNavBarItem = {
  key: string
  label: string
  active?: boolean
  onPress?: () => void
}

interface BottomTabsProps {
  items: BottomNavBarItem[]
  onTabChange: (key: string) => void
}

export const BottomTabs = ({ items, onTabChange }: BottomTabsProps) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <View
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      alignItems="center"
      pointerEvents="box-none"
    >
      <XStack
        width="100%"
        maxWidth={480}
        backgroundColor="$primary500"
        borderTopLeftRadius={24}
        borderTopRightRadius={24}
        overflow="hidden"
        paddingHorizontal="$3"
        paddingTop="$2"
        paddingBottom={Math.max(bottom, 8)}
      >
        <XStack flex={1} justifyContent="space-around">
          {items.map((it) => (
            <Pressable key={it.key} aria-selected={it.active} onPress={() => onTabChange(it.key)}>
              <YStack alignItems="center" gap="$1">
                <HeaderText variant="h3" color={it.active ? "$accent500" : "$white100"}>
                  {it.label}
                </HeaderText>
              </YStack>
            </Pressable>
          ))}
        </XStack>
      </XStack>
    </View>
  )
}

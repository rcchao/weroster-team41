import { ReactNode } from "react"
import { Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { XStack, YStack } from "tamagui"

import { HeaderText } from "./HeaderText"

export type BottomNavBarItem = {
  key: string
  label: string
  icon: ReactNode
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
    <XStack
      bottom={0}
      left={0}
      right={0}
      alignItems="center"
      pointerEvents="box-none"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: -4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack
        width="100%"
        maxWidth={480}
        backgroundColor="$primary500"
        borderTopLeftRadius={24}
        borderTopRightRadius={24}
        overflow="hidden"
        paddingHorizontal="$3"
        paddingTop="$3"
        paddingBottom={bottom}
      >
        <XStack flex={1} justifyContent="space-around">
          {items.map((it) => (
            <Pressable key={it.key} aria-selected={it.active} onPress={() => onTabChange(it.key)}>
              <YStack alignItems="center" gap="$1">
                {it.icon}
                <HeaderText variant="h3" color={it.active ? "$accent500" : "$white100"}>
                  {it.label}
                </HeaderText>
              </YStack>
            </Pressable>
          ))}
        </XStack>
      </XStack>
    </XStack>
  )
}

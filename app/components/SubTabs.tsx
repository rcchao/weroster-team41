import { GestureResponderEvent } from "react-native"
import { Button, XStack } from "tamagui"

import { HeaderText } from "./HeaderText"

type SubTab = {
  key: string
  label: string
}

interface SubTabsProps {
  tabs: SubTab[]
  activeTab: string
  onTabChange: (key: string) => void
}

export const SubTabs = ({ tabs, activeTab, onTabChange }: SubTabsProps) => {
  return (
    <XStack
      width="100%"
      minHeight="$4"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderBottomLeftRadius="$radius.6"
      borderBottomRightRadius="$radius.6"
      backgroundColor="$primary500"
      overflow="hidden"
    >
      {tabs.map((tab) => {
        const selected = tab.key === activeTab
        const onPress = (e: GestureResponderEvent) => onTabChange?.(tab.key)
        return (
          <Button
            key={tab.key}
            onPress={onPress}
            aria-selected={selected}
            flex={1}
            borderRadius={0}
            chromeless
            padding={0}
          >
            <HeaderText variant="h3" color="$white100">
              {tab.label}
            </HeaderText>
          </Button>
        )
      })}
    </XStack>
  )
}

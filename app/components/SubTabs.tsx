import { GestureResponderEvent } from "react-native"
import { Button, styled, XStack, YStack } from "tamagui"

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

const TabButton = styled(Button, {
  flex: 1,
  height: 56,
  borderRadius: 0,
  chromeless: true,
  padding: 0,
  position: "relative",
  paddingVertical: 0,
  minHeight: "unset",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 0,
  borderColor: "transparent",

  pressStyle: {
    backgroundColor: "$primary700",
  },
})

export const SubTabs = ({ tabs, activeTab, onTabChange }: SubTabsProps) => {
  return (
    <XStack
      width="100%"
      height={56}
      alignItems="center"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderBottomLeftRadius="$radius.6"
      borderBottomRightRadius="$radius.6"
      backgroundColor="$primary500"
      overflow="hidden"
      borderColor="transparent"
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.5)"}
    >
      {tabs.map((tab) => {
        const selected = tab.key === activeTab
        const onPress = (_e: GestureResponderEvent) => onTabChange?.(tab.key)
        return (
          <TabButton key={tab.key} onPress={onPress} aria-selected={selected}>
            <YStack flex={1} alignItems="center" justifyContent="center" width="100%" height="100%">
              {selected && (
                <XStack
                  position="absolute"
                  top={0}
                  height={3}
                  width="100%"
                  backgroundColor="$accent500"
                  borderColor="$accent500"
                />
              )}
              <HeaderText variant="h3" color={selected ? "$accent500" : "$white100"}>
                {tab.label}
              </HeaderText>
            </YStack>
          </TabButton>
        )
      })}
    </XStack>
  )
}

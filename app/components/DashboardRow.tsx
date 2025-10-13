import { Fragment } from "react"
import { Pressable } from "react-native"
import { ScrollView, useTheme, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"

interface DashboardRowProps {
  title: string
  onPressViewAll: () => void
  cards: React.ReactNode[]
}

export const DashboardRow = ({ title, onPressViewAll, cards }: DashboardRowProps) => {
  const theme = useTheme()
  return (
    <YStack paddingInline={10}>
      <XStack alignItems="center" justifyContent="space-between" paddingInline={10}>
        <XStack flex={1} pr="$2" minWidth={0}>
          <HeaderText variant="h2" color="$mono400" numberOfLines={1}>
            {title}
          </HeaderText>
        </XStack>
        <Pressable onPress={onPressViewAll}>
          <XStack alignItems="center" gap="$1.5" flexShrink={0}>
            <BodyText variant="body2" color="$accent500">
              View All
            </BodyText>
            <Icon icon="right" size={16} color={theme.accent500.val} />
          </XStack>
        </Pressable>
      </XStack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        margin={0}
      >
        <XStack gap="$3" paddingBlock={20} paddingInline={10}>
          {cards.map((card, i) => (
            <Fragment key={i}>{card}</Fragment>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}

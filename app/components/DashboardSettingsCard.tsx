import { FC } from "react"
import { Pressable } from "react-native"
import { ViewStyle } from "react-native"
import { XStack, YStack, Checkbox, useTheme } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { Icon } from "@/components/Icon"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

type DashboardSettingsCardProps = {
  title: string
  subtitle: string
  checked: boolean
  onToggle: (checked: boolean) => void
  onDrag?: () => void
}

export const DashboardSettingsCard: FC<DashboardSettingsCardProps> = ({
  title,
  subtitle,
  checked,
  onToggle,
  onDrag,
}) => {
  const { themed } = useAppTheme()
  const theme = useTheme()

  return (
    <XStack style={themed($dashboardCard)}>
      <Checkbox
        testID="checkbox"
        borderColor={theme.accent500.val}
        borderWidth={1.5}
        checked={checked}
        onCheckedChange={(state) => onToggle(state === true)}
      >
        <Checkbox.Indicator>
          <Icon icon="check" size={16} color={theme.accent500.val} />
        </Checkbox.Indicator>
      </Checkbox>
      <YStack flex={1}>
        <BodyText testID="settings-card-title" variant="body" marginLeft={16}>
          {title}
        </BodyText>
        <BodyText testID="settings-card-subtitle" variant="body3" marginLeft={16}>
          {subtitle}
        </BodyText>
      </YStack>
      <Pressable onPress={onDrag} hitSlop={10}>
        <Icon icon="alignJustify" size={24} color={colors.border} />
      </Pressable>
    </XStack>
  )
}

export const $dashboardCard: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.background,
  justifyContent: "space-between",
  padding: spacing.md,
})

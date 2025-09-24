import { FC } from "react"
import { Pressable } from "react-native"
import { ViewStyle } from "react-native"
import { TextStyle } from "react-native"
import { XStack, YStack, Checkbox } from "tamagui"

import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
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

  return (
    <XStack style={themed($dashboardCard)}>
      <Checkbox
        style={themed($checkbox)}
        checked={checked}
        onCheckedChange={(state) => onToggle(state === true)}
      >
        <Checkbox.Indicator>
          <Icon icon="lucideCheck" size={16} color={colors.palette.secondary200} />
        </Checkbox.Indicator>
      </Checkbox>
      <YStack flex={1}>
        <Text style={themed($titleStyle)}>{title}</Text>
        <Text style={themed($subtitleStyle)}>{subtitle}</Text>
      </YStack>
      <Pressable onPress={onDrag} hitSlop={10}>
        <Icon icon="alignJustify" size={24} color={colors.border} />
      </Pressable>
    </XStack>
  )
}

export const $checkbox: ThemedStyle<ViewStyle> = () => ({
  borderColor: colors.palette.secondary200,
  borderWidth: 3,
  size: 16,
})

export const $titleStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.bold,
  fontSize: 16,
  marginLeft: spacing.md,
})

export const $subtitleStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.regular,
  fontSize: 12,
  marginLeft: spacing.md,
})

export const $dashboardCard: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.background,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
  borderRadius: spacing.sm,
  justifyContent: "space-between",
  marginBottom: spacing.md,
  marginVertical: spacing.xs,
  padding: spacing.md,
})

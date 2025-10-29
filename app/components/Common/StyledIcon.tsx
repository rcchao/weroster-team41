import { useTheme } from "tamagui"

import { Icon, type IconProps } from "@/components/Icon"

type StyledIconProps = Omit<IconProps, "color"> & {
  size?: number
}

export function StyledIcon({ size = 16, ...props }: StyledIconProps) {
  const theme = useTheme()

  return <Icon {...props} size={size} color={theme.secondary500.val} />
}

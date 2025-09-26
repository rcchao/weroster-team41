import { useTheme } from "tamagui"

import { Icon, type IconProps } from "@/components/Icon"

type StyledIconProps = Omit<IconProps, "size" | "color">

export function StyledIcon(props: StyledIconProps) {
  const theme = useTheme()

  return <Icon {...props} size={16} color={theme.secondary500.val} />
}

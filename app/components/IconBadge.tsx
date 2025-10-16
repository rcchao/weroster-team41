import { Circle } from "tamagui"

import { Icon, type IconTypes } from "./Icon"

type IconBadgeConfig = {
  icon: IconTypes
  bgColor: string
  color: string
}

const ICON_BADGE_CONFIG: Record<string, IconBadgeConfig> = {
  AMShift: {
    icon: "am",
    bgColor: "yellow300",
    color: "yellow800",
  },
  PMShift: {
    icon: "pm",
    bgColor: "red300",
    color: "red800",
  },
  AHShift: {
    icon: "afterHours",
    bgColor: "secondary300",
    color: "secondary800",
  },
  halfDay: {
    icon: "circleSlash",
    bgColor: "secondary400",
    color: "secondary800",
  },
  fullDay: {
    icon: "circle",
    bgColor: "yellow400",
    color: "yellow800",
  },
}

export type IconBadgeType = "AMShift" | "PMShift" | "AHShift" | "halfDay" | "fullDay"

interface IconBadgeProps {
  type: IconBadgeType
}

export const IconBadge = ({ type }: IconBadgeProps) => {
  if (!ICON_BADGE_CONFIG[type]) {
    return null
  }
  const iconConfig = ICON_BADGE_CONFIG[type]

  const icon = iconConfig.icon
  //   const bgColor = iconConfig.bgColor
  return (
    <Circle size="$4" backgroundColor={`$${iconConfig.bgColor}` as any}>
      <Icon icon={icon} />
    </Circle>
  )
}

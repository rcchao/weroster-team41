import { useState } from "react"
import { Button, Text, useTheme } from "tamagui"

import { Icon, IconTypes } from "./Icon"

interface LozengeProps {
  type:
    | "leave"
    | "swap"
    | "event"
    | "available"
    | "requested"
    | "urgent"
    | "approved"
    | "awaiting"
    | "declined"
    | "assigned"
    | "openShift"
  active?: boolean
  onPress?: () => void
}

const LOZENGE_TEXT_MAP: Record<string, string> = {
  leave: "Leave",
  swap: "Swap",
  event: "Event",
  available: "Available",
  requested: "Requested",
  urgent: "Urgent",
  approved: "Approved",
  awaiting: "Awaiting",
  declined: "Declined",
  assigned: "Assigned",
  openShift: "OpenShift",
}

const LOZENGE_ICON_MAP: Record<string, IconTypes> = {
  leave: "leave",
  swap: "swap",
  event: "openShift",
  openShift: "openShift",
}

const LOZENGE_BGCOLOR_MAP: Record<string, string> = {
  leave: "mono100",
  swap: "mono100",
  event: "mono100",
  available: "green500",
  requested: "mono100",
  urgent: "red500",
  approved: "green500",
  awaiting: "yellow400",
  declined: "red500",
  assigned: "secondary300",
  openShift: "mono100",
}

const LOZENGE_SELECTED_BGCOLOR_MAP: Record<string, string> = {
  leave: "secondary400",
  swap: "yellow400",
  openShift: "green500",
  approved: "green500",
  awaiting: "yellow400",
  declined: "red500",
}

const LOZENGE_TEXT_COLOR_MAP: Record<string, string> = {
  available: "green800",
  urgent: "red800",
  approved: "green800",
  awaiting: "yellow800",
  declined: "red800",
  assigned: "accent800",
}

export const Lozenge = ({ type, active = false, onPress }: LozengeProps) => {
  const theme = useTheme()
  const [selected, setSelected] = useState(false)

  const buttonText = LOZENGE_TEXT_MAP[type] || "Lozenge"
  const buttonIcon = LOZENGE_ICON_MAP[type] || null

  const defaultBg = !active ? theme[LOZENGE_BGCOLOR_MAP[type]]?.val : theme["mono100"]?.val
  const selectedBg = theme[LOZENGE_SELECTED_BGCOLOR_MAP[type]]?.val || defaultBg
  const buttonBgColor = selected ? selectedBg : defaultBg

  const buttonTextColor = !active ? theme[LOZENGE_TEXT_COLOR_MAP[type]]?.val : theme["mono900"]?.val

  return (
    <Button
      height={active ? 33 : 24}
      borderRadius="$full"
      size="$3"
      width="auto"
      flexGrow={0}
      alignSelf="flex-start"
      disabled={!active}
      backgroundColor={buttonBgColor}
      onPress={() => {
        if (!active) return
        setSelected(!selected)
        onPress?.()
      }}
    >
      {buttonIcon && <Icon icon={buttonIcon} size={16} color={buttonTextColor} />}
      <Text fontSize={12} color={buttonTextColor}>
        {buttonText}
      </Text>
    </Button>
  )
}

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

interface LozengeConfig {
  text: string
  icon?: IconTypes
  bgColor: string
  selectedBgColor?: string
  textColor?: string
}

const LOZENGE_CONFIG: Record<LozengeProps["type"], LozengeConfig> = {
  leave: {
    text: "Leave",
    icon: "leave",
    bgColor: "mono100",
    selectedBgColor: "secondary400",
    textColor: "mono900",
  },
  swap: {
    text: "Swap",
    icon: "swap",
    bgColor: "mono100",
    selectedBgColor: "yellow400",
    textColor: "mono900",
  },
  event: {
    text: "Event",
    icon: "openShift",
    bgColor: "mono100",
    textColor: "mono900",
  },
  available: {
    text: "Available",
    bgColor: "green500",
    textColor: "green800",
  },
  requested: {
    text: "Requested",
    bgColor: "mono100",
    textColor: "mono900",
  },
  urgent: {
    text: "Urgent",
    bgColor: "red500",
    textColor: "red800",
  },
  approved: {
    text: "Approved",
    bgColor: "green500",
    selectedBgColor: "green500",
    textColor: "green800",
  },
  awaiting: {
    text: "Awaiting",
    bgColor: "yellow400",
    selectedBgColor: "yellow400",
    textColor: "yellow800",
  },
  declined: {
    text: "Declined",
    bgColor: "red500",
    selectedBgColor: "red500",
    textColor: "red800",
  },
  assigned: {
    text: "Assigned",
    bgColor: "secondary300",
    textColor: "accent800",
  },
  openShift: {
    text: "OpenShift",
    icon: "openShift",
    bgColor: "mono100",
    selectedBgColor: "green500",
    textColor: "mono900",
  },
}

export const Lozenge = ({ type, active = false, onPress }: LozengeProps) => {
  const theme = useTheme()
  const [selected, setSelected] = useState(false)

  const lozenge = LOZENGE_CONFIG[type]

  const buttonText = lozenge.text || "Lozenge"
  const buttonIcon = lozenge.icon || null

  const defaultBg = !active ? theme[lozenge.bgColor]?.val : theme["mono100"]?.val
  const selectedBg = lozenge.selectedBgColor ? theme[lozenge.selectedBgColor]?.val : defaultBg
  const buttonBgColor = selected ? selectedBg : defaultBg

  const buttonTextColor =
    !active && lozenge.textColor ? theme[lozenge.textColor]?.val : theme["mono900"]?.val

  return (
    <Button
      height={active ? 33 : 24}
      borderRadius="$full"
      size="$3"
      width={active ? 110 : "auto"}
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

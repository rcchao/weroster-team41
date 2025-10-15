import { useState } from "react"
import { Button, useTheme } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon, IconTypes } from "./Icon"

export type LozengeType =
  | "LEAVE"
  | "SWAP"
  | "event"
  | "AVAILABLE"
  | "REQUESTED"
  | "URGENT"
  | "APPROVED"
  | "AWAITING"
  | "DECLINED"
  | "assigned"
  | "ASSIGNMENT"

interface LozengeProps {
  type: LozengeType
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

export const LOZENGE_CONFIG: Record<LozengeProps["type"], LozengeConfig> = {
  LEAVE: {
    text: "Leave",
    icon: "leave",
    bgColor: "mono100",
    selectedBgColor: "secondary400",
    textColor: "mono900",
  },
  SWAP: {
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
  AVAILABLE: {
    text: "Available",
    bgColor: "green500",
    textColor: "green800",
  },
  REQUESTED: {
    text: "Requested",
    bgColor: "mono100",
    textColor: "mono900",
  },
  URGENT: {
    text: "Urgent",
    bgColor: "red500",
    textColor: "red800",
  },
  APPROVED: {
    text: "Approved",
    bgColor: "green500",
    selectedBgColor: "green500",
    textColor: "green800",
  },
  AWAITING: {
    text: "Awaiting",
    bgColor: "yellow400",
    selectedBgColor: "yellow400",
    textColor: "yellow800",
  },
  DECLINED: {
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
  ASSIGNMENT: {
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

  if (!lozenge) {
    return null
  }

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
      accessibilityState={{ disabled: !active, selected }}
      testID={`lozenge-${type}`}
      onPress={() => {
        if (!active) return
        setSelected(!selected)
        onPress?.()
      }}
    >
      {buttonIcon && (
        <Icon icon={buttonIcon} size={16} color={buttonTextColor} testID={buttonIcon} />
      )}
      <BodyText variant="body4" color={buttonTextColor} includeFontPadding>
        {buttonText}
      </BodyText>
    </Button>
  )
}

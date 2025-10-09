import { Pressable } from "react-native"
import { ViewStyle } from "react-native"
import { format, addMonths, addDays } from "date-fns"
import { useTheme, XStack } from "tamagui"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

type SelectorMode = "month" | "day"

interface DateSelectorBarProps {
  mode: SelectorMode
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const DateSelectorBar = ({ mode, selectedDate, setSelectedDate }: DateSelectorBarProps) => {
  const theme = useTheme()
  const { themed } = useAppTheme()

  const adjustDate = (direction: "next" | "previous") => {
    const adjustment = direction === "next" ? 1 : -1
    const adjustFn = mode === "month" ? addMonths : addDays
    setSelectedDate(adjustFn(selectedDate, adjustment))
  }

  const displayDate = format(selectedDate, mode === "month" ? "MMMM yyyy" : "E, d MMM")

  return (
    <XStack
      height={56}
      width="100%"
      zIndex={1}
      alignItems="center"
      justifyContent="space-between"
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.4)"}
      px={16}
    >
      {/* Slider icon for configurations */}
      <Pressable>
        <Icon icon="sliders" size={24} color={theme.mono900.val} />
      </Pressable>

      {/* Month increment/decrement selector */}
      <XStack gap={1} alignItems="center">
        <Pressable onPress={() => adjustDate("previous")}>
          <Icon icon="left" size={24} color={theme.mono900.val} />
        </Pressable>
        <BodyText variant="body" marginHorizontal={10} width={130} textAlign="center">
          {displayDate}
        </BodyText>
        <Pressable onPress={() => adjustDate("next")}>
          <Icon icon="right" size={24} color={theme.mono900.val} />
        </Pressable>
      </XStack>

      {/* Search icon - disabled, not in use */}
      <Pressable disabled={true} style={themed($searchIcon)}>
        <Icon icon="search" size={24} color={theme.mono900.val} />
      </Pressable>
    </XStack>
  )
}

export { DateSelectorBar }

export const $searchIcon: ThemedStyle<ViewStyle> = () => ({
  opacity: 0,
})

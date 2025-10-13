import { Pressable } from "react-native"
import { format, addMonths, addDays } from "date-fns"
import { useTheme, XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

type SelectorMode = "month" | "day"

interface DateSelectorBarProps {
  mode: SelectorMode
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  setFilterSheetOpen?: (open: boolean) => void
}

const DateSelectorBar = ({
  mode,
  selectedDate,
  setSelectedDate,
  setFilterSheetOpen,
}: DateSelectorBarProps) => {
  const theme = useTheme()

  const adjustDate = (direction: "next" | "previous") => {
    const adjustment = direction === "next" ? 1 : -1
    const adjustFn = mode === "month" ? addMonths : addDays
    setSelectedDate(adjustFn(selectedDate, adjustment))
  }

  const displayDate = format(selectedDate, mode === "month" ? "MMMM yyyy" : "E, d MMM")

  return (
    <XStack
      height={50}
      paddingTop={10}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.4)"}
      px={16}
    >
      {/* Slider icon for configurations */}
      <Pressable
        onPress={() => {
          if (setFilterSheetOpen) setFilterSheetOpen(true)
        }}
      >
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
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Pressable disabled={true} style={{ opacity: 0 }}>
        <Icon icon="search" size={24} color={theme.mono900.val} />
      </Pressable>
    </XStack>
  )
}

export { DateSelectorBar }

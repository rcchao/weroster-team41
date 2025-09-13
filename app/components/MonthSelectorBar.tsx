import { Pressable } from "react-native"
import { format, addMonths, subMonths } from "date-fns"
import { useTheme, XStack, Text } from "tamagui"

import { Icon } from "./Icon"

interface MonthSelectorBarProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const MonthSelectorBar = ({ selectedDate, setSelectedDate }: MonthSelectorBarProps) => {
  const theme = useTheme()

  const adjustMonth = (direction: "next" | "previous") => {
    if (direction === "next") {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  const displayDate = format(selectedDate, "MMMM yyyy")

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
      <XStack gap={4} alignItems="center">
        <Pressable onPress={() => adjustMonth("previous")}>
          <Icon icon="left" size={24} color={theme.mono900.val} />
        </Pressable>
        <Text fontSize={16} fontWeight="600" marginHorizontal={10}>
          {displayDate}
        </Text>
        <Pressable onPress={() => adjustMonth("next")}>
          <Icon icon="right" size={24} color={theme.mono900.val} />
        </Pressable>
      </XStack>

      {/* Search icon - disabled, not in use */}
      <Pressable disabled={true}>
        <Icon icon="search" size={24} color={theme.mono900.val} />
      </Pressable>
    </XStack>
  )
}

export { MonthSelectorBar }

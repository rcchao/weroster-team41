/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { TouchableOpacity, StyleSheet } from "react-native"
import { format, getHours, parseISO } from "date-fns"
import { DateData } from "react-native-calendars"
import { useTheme, View } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

type EventStatus = "assigned" | "unassigned" | "pending" | "draft"

export type DayEvent = {
  id: string
  startsAt: Date
  status: EventStatus
}

interface DayPillProps {
  date: DateData
  isSelected?: boolean
  events: DayEvent[]
  onPress: () => void
}

export const DayPill = ({ date, isSelected, events, onPress }: DayPillProps) => {
  const theme = useTheme()

  const day = parseISO(date.dateString)
  const hasEvents = events.length > 0

  const hasNight = events.some((e) => isNight(e.startsAt))
  const hasDay = events.some((e) => isDay(e.startsAt))
  const icon: "moon" | "sun" | null = hasNight ? "moon" : hasDay ? "sun" : null

  // Build up to two dots; filled if assigned
  const dots = events.slice(0, 2).map((e) => e.status === "assigned")

  const colors = {
    pillDefault: theme.white400.val,
    pillSelected: theme.secondary500.val,
    pillWithEvents: theme.mono200.val,
    textDark: theme.mono900.val,
  }

  const pillBg = isSelected
    ? colors.pillSelected
    : hasEvents
      ? colors.pillWithEvents
      : colors.pillDefault

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      {/* Pill */}
      <View style={[styles.pill, { backgroundColor: pillBg }]}>
        {/* Icon (or nothing if no events) */}
        <View style={styles.iconWrapper}>
          {icon && <Icon icon={icon} size={14} color={isSelected ? "#fff" : colors.textDark} />}
        </View>

        {/* Day number */}
        <BodyText
          variant="body2"
          style={[styles.dayNum, { color: isSelected ? "#fff" : colors.textDark }]}
        >
          {format(day, "d")}
        </BodyText>

        {/* Dots row */}
        <View style={styles.dotsRow}>
          {dots.map((filled, i) => (
            <View
              key={i}
              style={[
                styles.dotBase,
                i === 1 && { marginLeft: 4 },
                {
                  backgroundColor: isSelected ? "#fff" : colors.textDark,
                  opacity: filled ? 0.95 : 0.45,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}

// Checks if the given date can be classified as "nighttime"
function isNight(v: Date): boolean {
  const h = getHours(v)
  return h >= 18 || h < 6
}

// Checks if the given date can be classified as "daytime"
function isDay(v: Date): boolean {
  const h = getHours(v)
  return h >= 6 && h < 18
}

const styles = StyleSheet.create({
  container: { alignItems: "center", width: 53 },
  dayNum: { fontSize: 16, fontWeight: "700" },
  dotBase: { borderRadius: 2, height: 4, width: 4 },

  dotsRow: { flexDirection: "row", marginTop: 4 },
  iconWrapper: {
    height: 18, // reserve space so layout doesn’t collapse if no icon
    justifyContent: "center",
  },
  pill: {
    alignItems: "center",
    borderRadius: 12,
    height: 60,
    justifyContent: "space-between", // spreads icon, number, dots vertically
    paddingVertical: 6,
    width: 45,
  },
})

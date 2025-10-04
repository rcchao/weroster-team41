/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { TouchableOpacity, StyleSheet } from "react-native"
import { format, getHours, parseISO } from "date-fns"
import type { DateData } from "react-native-calendars"
import type { DayProps } from "react-native-calendars/src/calendar/day"
import { useTheme, View } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

type EventStatus = "assigned" | "unassigned" | "pending" | "draft"

export type DayEvent = {
  id: string
  startsAt: Date
  status: EventStatus
}

// Minimal shape we actually use + our custom field
export type CustomMarking = {
  selected?: boolean
  marked?: boolean
  disabled?: boolean
  disableTouchEvent?: boolean
  events?: DayEvent[]
}

/** ── Component compatible with ExpandableCalendar.dayComponent ─────────── */
export const DayPill = ({
  date,
  state,
  marking,
  onPress,
}: DayProps & { date?: DateData; marking?: CustomMarking }) => {
  const theme = useTheme()
  if (!date) return null

  // typed access to our extended marking fields (if present)
  const m = (marking as CustomMarking) ?? ({} as CustomMarking)

  const isSelected = Boolean(m.selected)
  const events: DayEvent[] = Array.isArray(m.events) ? m.events : []

  const day = parseISO(date.dateString)
  const hasEvents = events.length > 0

  const hasNight = events.some((e) => isNight(e.startsAt))
  const hasDay = events.some((e) => isDay(e.startsAt))
  const icon: "afterHours" | "am" | null = hasNight ? "afterHours" : hasDay ? "am" : null

  // Build up to two dots; filled if assigned
  const dots = events.slice(0, 2).map((e) => e.status === "assigned")

  const colors = {
    pillDefault: theme.white100.val,
    pillSelected: theme.secondary500.val,
    pillWithEvents: theme.white400.val,
    textDark: theme.mono900.val,
  }

  const pillBg = isSelected
    ? colors.pillSelected
    : hasEvents
      ? colors.pillWithEvents
      : colors.pillDefault

  const disabled = state === "disabled"

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(date)}
      style={[styles.container, disabled && { opacity: 0.35 }]}
      disabled={disabled}
    >
      {/* Pill */}
      <View style={[styles.pill, { backgroundColor: pillBg }]}>
        {/* Icon (or nothing if no events) */}
        <View style={styles.iconWrapper}>
          {icon && (
            <Icon
              icon={icon}
              size={16}
              color={isSelected ? theme.white100.val : theme.mono300.val}
            />
          )}
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
function isNight(date: Date): boolean {
  const hour = getHours(date)
  return hour >= 18 || hour < 6
}

// Checks if the given date can be classified as "daytime"
function isDay(date: Date): boolean {
  const hour = getHours(date)
  return hour >= 6 && hour < 18
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
    height: 55,
    justifyContent: "space-between", // spreads icon, number, dots vertically
    paddingVertical: 6,
    width: 40,
  },
})

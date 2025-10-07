import { useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { View, Text, useTheme } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { CustomMarking, DayEvent, DayPill } from "./DayPill"
import { ShiftCard } from "./ShiftCard"

interface RosterCalendarProps {
  events: ShiftWithNumUsers[]
}

type AgendaItem = {
  id: string
  shift: ShiftWithNumUsers
}

type AgendaSection = {
  title: string
  data: AgendaItem[]
}

// Group the events by day
function buildAgendaSections(shifts: ShiftWithNumUsers[]) {
  // Store agenda sections to be displayed in the calendar.
  const sections: AgendaSection[] = []

  // Store calendar markings to show on the calendar.
  const marked: Record<string, CustomMarking> = {}

  for (const shift of shifts) {
    const start = shift.start_time

    const dateKey = format(start, "yyyy-MM-dd")

    const item: AgendaItem = {
      id: String(shift.id),
      shift: shift,
    }

    const lastSection = sections[sections.length - 1]
    if (lastSection && lastSection.title === dateKey) {
      lastSection.data.push(item)
    } else {
      sections.push({ title: dateKey, data: [item] })
    }

    // Add data to your DayPill needs on each date
    const dayEvent: DayEvent = {
      id: String(shift.id),
      startsAt: start,
      // Used to distinguish between assigned and open shifts (currently just assumed all assigned)
      status: "assigned",
    }

    if (marked[dateKey]) {
      marked[dateKey].events?.push(dayEvent)
    } else {
      marked[dateKey] = { marked: true, events: [dayEvent] }
    }
  }

  return { sections, marked }
}

export const RosterCalendar = ({ events }: RosterCalendarProps) => {
  const theme = useTheme()

  // Default day chosen should be today
  const firstDate = format(new Date(), "yyyy-MM-dd")

  const [selected, setSelected] = useState(firstDate)

  const { sections, marked } = useMemo(() => buildAgendaSections(events), [events])
  const markedDates = useMemo(
    () => ({
      ...marked,
      [selected]: { ...(marked[selected] ?? {}), selected: true },
    }),
    [marked, selected],
  )

  return (
    <CalendarProvider date={selected} onDateChanged={setSelected} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        markedDates={markedDates}
        allowShadow
        dayComponent={DayPill}
        calendarHeight={200}
        theme={{
          monthTextColor: theme.primary500.val,
          textMonthFontSize: 16,
          textMonthFontFamily: "Inter",

          textSectionTitleColor: theme.mono900.val,
          textSectionTitleDisabledColor: "#DDD",
          textDayHeaderFontSize: 14,

          arrowColor: theme.accent400.val,
          disabledArrowColor: theme.mono400.val,
        }}
      />
      <AgendaList
        sections={sections}
        keyExtractor={(item) => item.id}
        dayFormatter={(day) => format(parseISO(day), "EEE, d MMM")}
        renderItem={({ item }) => (
          <View paddingHorizontal="$3" paddingVertical="$2">
            <ShiftCard shift={item.shift} />
          </View>
        )}
        ListEmptyComponent={
          <View padding="$4">
            <Text>No shifts found.</Text>
          </View>
        }
      />
    </CalendarProvider>
  )
}

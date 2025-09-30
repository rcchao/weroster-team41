import { useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { View, Text } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

interface RosterCalendarProps {
  events: ShiftWithNumUsers[]
}

type AgendaItem = {
  id: string
  name: string
  timeRange: string
  location: string
  start: Date
  numUsers: number
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
  const marked: Record<string, any> = {}

  for (const shift of shifts) {
    const start = shift.start_time
    const end = shift.end_time

    const dateKey = format(start, "yyyy-MM-dd")

    const item: AgendaItem = {
      id: String(shift.id),
      name: shift.activity?.name ?? "Shift",
      timeRange: `${format(start, "h:mm a")} – ${format(end, "h:mm a")}`,
      location: shift.location.name,
      start,
      numUsers: shift.numUsers,
    }

    const lastSection = sections[sections.length - 1]
    if (lastSection && lastSection.title === dateKey) {
      lastSection.data.push(item)
    } else {
      sections.push({ title: dateKey, data: [item] })
    }

    marked[dateKey] = { marked: true }
  }

  return { sections, marked }
}

export const RosterCalendar = ({ events }: RosterCalendarProps) => {
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
      <ExpandableCalendar firstDay={1} markedDates={markedDates} allowShadow />
      <AgendaList
        sections={sections}
        keyExtractor={(item) => item.id}
        dayFormatter={(day) => format(parseISO(day), "EEE, d MMM")}
        renderItem={({ item }) => (
          <View paddingHorizontal="$3" paddingVertical="$2">
            <Text fontWeight="600">{item.timeRange}</Text>
            <Text>
              {item.name}
              {item.location ? ` · ${item.location}` : ""}
            </Text>
            <Text>{item.numUsers - 1} others working</Text>
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

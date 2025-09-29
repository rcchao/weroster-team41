import { useMemo, useState } from "react"
import { format, parseISO, toDate } from "date-fns"
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { View, Text } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

interface RosterCalendarProps {
  events: ShiftWithNumUsers[] | undefined
}

type AgendaItem = {
  id: string
  name: string
  timeRange: string
  location?: string | null
  start: Date
  numUsers: number
}

type AgendaSection = {
  title: string
  data: AgendaItem[]
}

// Group the events by day
function buildAgendaSections(data: ShiftWithNumUsers[] | undefined) {
  const safe = Array.isArray(data) ? data : []
  const byDate: Record<string, AgendaItem[]> = {}

  for (const ev of safe) {
    const start = toDate(ev.start_time as any)
    const end = toDate(ev.end_time as any)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) continue // skip bad rows

    const dateKey = format(start, "yyyy-MM-dd")

    const item: AgendaItem = {
      id: String(ev.id),
      name: ev.activity?.name ?? "Shift",
      timeRange: `${format(start, "h:mm a")} – ${format(end, "h:mm a")}`,
      location: ev.location?.name ?? null,
      start,
      numUsers: (ev as any).numUsers ?? 0,
    }

    if (!byDate[dateKey]) byDate[dateKey] = []
    byDate[dateKey].push(item)
  }

  const sections: AgendaSection[] = Object.entries(byDate)
    .sort(([a], [b]) => (a < b ? -1 : 1)) // Sort dates in chronological order
    .map(([dateKey, items]) => ({
      title: dateKey,
      data: items.sort((a, b) => a.start.getTime() - b.start.getTime()),
    }))

  // Build calendar markings to show on the calendar.
  const marked: Record<string, any> = {}
  for (const dateKey of Object.keys(byDate)) marked[dateKey] = { marked: true }

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
            <Text>{item.numUsers} others working</Text>
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

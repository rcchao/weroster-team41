import { useCallback, useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { View, Text, useTheme } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { BodyText } from "./BodyText"
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

  // Memoise components within the calendar
  const calendarTheme = useMemo(
    () => ({
      monthTextColor: theme.primary500.val,
      textMonthFontSize: 16,
      textMonthFontFamily: "Inter",
      textSectionTitleColor: theme.mono900.val,
      textSectionTitleDisabledColor: "#DDD",
      textDayHeaderFontSize: 14,
      arrowColor: theme.accent400.val,
      disabledArrowColor: theme.mono400.val,
    }),
    [theme.primary500.val, theme.mono900.val, theme.accent400.val, theme.mono400.val],
  )

  const keyExtractor = useCallback((item: any) => item.id, [])

  const dayFormatter = useCallback((day: string) => format(parseISO(day), "EEE, d MMM"), [])

  const renderSectionHeader = useCallback((section: any) => {
    const dateKey = section as unknown as string
    const displayDate = format(dateKey, "yyyy-MM-dd")
    const isToday = displayDate === format(new Date(), "yyyy-MM-dd")

    return (
      <View
        backgroundColor={isToday ? "$secondary500" : "$white400"}
        height={40}
        justifyContent="center"
        paddingInlineStart={30}
      >
        <BodyText variant="body2" color={isToday ? "$white100" : "$mono900"}>
          {isToday
            ? `TODAY - ${format(parseISO(dateKey), "EEE, d MMM").toUpperCase()}`
            : format(parseISO(dateKey), "EEE, d MMM").toUpperCase()}
        </BodyText>
      </View>
    )
  }, [])

  const renderItem = useCallback(
    ({ item }: any) => (
      <View paddingHorizontal="$3" paddingVertical={8} backgroundColor="$white100">
        <ShiftCard shift={item.shift} />
      </View>
    ),
    [],
  )

  const listEmptyComponent = useMemo(
    () => (
      <View padding="$4">
        <Text>No shifts found.</Text>
      </View>
    ),
    [],
  )

  const dayComponent = useCallback((props: any) => <DayPill {...props} />, [])

  return (
    <CalendarProvider date={selected} onDateChanged={setSelected} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        markedDates={markedDates}
        allowShadow
        dayComponent={dayComponent}
        calendarHeight={200}
        theme={calendarTheme}
      />
      <AgendaList
        sections={sections}
        keyExtractor={keyExtractor}
        dayFormatter={dayFormatter}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
      />
    </CalendarProvider>
  )
}

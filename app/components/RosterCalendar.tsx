import { useState } from "react"
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { View, Text } from "tamagui"

// Mock data
const ITEMS = [
  {
    title: "2025-09-24",
    data: [
      { id: "1", name: "Morning Yoga", time: "07:00 AM" },
      { id: "2", name: "Team Standup", time: "09:30 AM" },
      { id: "3", name: "Project Review Meeting", time: "02:00 PM" },
    ],
  },
  {
    title: "2025-09-25",
    data: [
      { id: "4", name: "Doctor Appointment", time: "10:00 AM" },
      { id: "5", name: "Lunch with Sarah", time: "12:30 PM" },
      { id: "6", name: "Code Review", time: "04:00 PM" },
    ],
  },
  {
    title: "2025-09-26",
    data: [
      { id: "7", name: "Gym", time: "06:30 AM" },
      { id: "8", name: "Design Sprint Workshop", time: "11:00 AM" },
      { id: "9", name: "Dinner with Parents", time: "07:00 PM" },
    ],
  },
]

export const RosterCalendar = () => {
  const [selected, setSelected] = useState("2025-09-24")
  return (
    <CalendarProvider date={selected} onDateChanged={(d) => setSelected(d)} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        markedDates={{
          [selected]: { selected: true },
        }}
        allowShadow
      />
      <AgendaList
        sections={ITEMS}
        renderItem={({ item }) => (
          <View>
            <Text>{item.time}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </CalendarProvider>
  )
}

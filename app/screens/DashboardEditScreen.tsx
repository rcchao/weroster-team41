import { FC } from "react"
import { useState } from "react"
import { Pressable } from "react-native"
import { View } from "react-native"
import { TextStyle } from "react-native"
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist"

import { DashboardSettingsCard } from "@/components/DashboardSettingsCard"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { $topRightIcons, $headerIcons } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

const initialCards = [
  { id: "duty", title: "Who's on duty", subtitle: "See who's on duty based on your saved filters" },
  {
    id: "upcomingShift",
    title: "Upcoming shifts",
    subtitle: "View your scheduled shifts for this week",
  },
  {
    id: "upcomingLeave",
    title: "Upcoming leaves",
    subtitle: "Track your approved and pending leaves for this month",
  },
  {
    id: "openShift",
    title: "Open shifts",
    subtitle: "Browse available shifts you can apply for this week",
  },
  { id: "roster", title: "Team Roster", subtitle: "See Team Roster with your saved preferences" },
]

export const DashboardEditScreen: FC<AppStackScreenProps<"EditDashboard">> =
  function DashboardEditScreen(_props) {
    const { navigation } = _props
    const { themed } = useAppTheme()

    const [cards, setCards] = useState(initialCards)
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({})

    const toggleChecked = (id: string, newChecked: boolean) => {
      setCheckedStates((prev) => ({ ...prev, [id]: newChecked }))
    }

    const renderItem = ({ item, drag }: RenderItemParams<(typeof cards)[0]>) => {
      return (
        <DashboardSettingsCard
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          checked={!!checkedStates[item.id]}
          onToggle={(newChecked) => toggleChecked(item.id, newChecked)}
          onDrag={drag}
        />
      )
    }

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]}>
        <View style={themed($topRightIcons)}>
          <Pressable onPress={() => navigation.goBack()} style={themed($headerIcons)}>
            <Icon icon="anchor" />
          </Pressable>
        </View>

        <Text style={themed($editDashboardText)}>Customise what you see on your dashboard</Text>

        <DraggableFlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onDragEnd={({ data }) => setCards(data)} // update card order
        />
      </Screen>
    )
  }

export const $editDashboardText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.medium,
  fontSize: 16,
  lineHeight: 20,
  marginLeft: spacing.md,
  marginTop: spacing.xxxl,
})

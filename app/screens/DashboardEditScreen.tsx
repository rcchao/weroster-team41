import { FC } from "react"
import { useState } from "react"
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist"
import { YStack } from "tamagui"
import { Separator } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { DashboardSettingsCard } from "@/components/DashboardSettingsCard"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useDashboardPreferences } from "@/services/hooks/useDashboardPreferences"
import { tamaguiConfig } from "@/tamagui.config"
import { spacing } from "@/theme/spacing"
import { $styles } from "@/theme/styles"

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

const renderSeparator = () => (
  <Separator
    marginVertical={spacing.xxxs}
    marginHorizontal={spacing.sm}
    alignSelf="stretch"
    borderColor={tamaguiConfig.tokens.color.mono300}
  />
)

export const DashboardEditScreen: FC<AppStackScreenProps<"EditDashboard">> =
  function DashboardEditScreen(_props) {
    const { navigation } = _props

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
    const { dashboardPreferences } = useDashboardPreferences()

    const handleSavePress = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return (
      <Screen preset="fixed" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
        <BackHeader navigation={navigation} title="Edit Dashboard" onSavePress={handleSavePress} />
        <YStack marginTop="$4">
          <BodyText variant="body" marginLeft={16}>
            Customise what you see on your dashboard
          </BodyText>
          <DraggableFlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => setCards(data)} // update card order
            scrollEnabled={false}
            activationDistance={Number.MAX_SAFE_INTEGER}
            ItemSeparatorComponent={renderSeparator}
          />
          <Separator alignSelf="stretch" borderColor={tamaguiConfig.tokens.color.mono300} />
          <Text>{dashboardPreferences ? JSON.stringify(dashboardPreferences) : "Loading..."}</Text>
        </YStack>
      </Screen>
    )
  }

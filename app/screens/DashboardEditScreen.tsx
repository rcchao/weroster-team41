import { FC } from "react"
import { useState } from "react"
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist"
import { YStack } from "tamagui"
import { Separator } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { DashboardSettingsCard } from "@/components/DashboardSettingsCard"
import { Screen } from "@/components/Screen"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useDashboardPreferences } from "@/services/hooks/useDashboardPreferences"
import { usePostDashboardPreferences } from "@/services/hooks/useDashboardPreferences"
import { tamaguiConfig } from "@/tamagui.config"
import { spacing } from "@/theme/spacing"
import { $styles } from "@/theme/styles"

import { DashboardPreferences } from "../../backend/src/types/settings.types"

type DashboardCard = {
  id: keyof DashboardPreferences
  title: string
  subtitle: string
}

const DASHBOARD_CARDS: DashboardCard[] = [
  {
    id: "whos_on_duty",
    title: "Who's on duty",
    subtitle: "See who's on duty based on your saved filters",
  },
  {
    id: "upcoming_shifts",
    title: "Upcoming shifts",
    subtitle: "View your scheduled shifts for this week",
  },
  {
    id: "upcoming_leaves",
    title: "Upcoming leaves",
    subtitle: "Track your approved and pending leaves for this month",
  },
  {
    id: "open_shifts",
    title: "Open shifts",
    subtitle: "Browse available shifts you can apply for this week",
  },
  {
    id: "team_roster",
    title: "Team Roster",
    subtitle: "See Team Roster with your saved preferences",
  },
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
    const mutation = usePostDashboardPreferences()
    const [cards, setCards] = useState(DASHBOARD_CARDS)

    const { dashboardPreferences } = useDashboardPreferences()

    const [checkedStates, setCheckedStates] = useState<DashboardPreferences>(
      dashboardPreferences ?? {
        whos_on_duty: true,
        upcoming_shifts: true,
        upcoming_leaves: true,
        open_shifts: true,
        team_roster: true,
      },
    )
    const toggleChecked = (id: keyof DashboardPreferences, checked: boolean) => {
      setCheckedStates((prev) => ({ ...prev, [id]: checked }))
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

    const handleSavePress = async () => {
      console.log(checkedStates)
      const payload: DashboardPreferences = DASHBOARD_CARDS.reduce((acc, card) => {
        acc[card.id] = !!checkedStates[card.id]
        return acc
      }, {} as DashboardPreferences)
      try {
        const data = await mutation.mutateAsync(payload)
        console.log("Posted successfully:", data)
      } catch (error) {
        console.error("Error posting:", error)
      }
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
        </YStack>
      </Screen>
    )
  }

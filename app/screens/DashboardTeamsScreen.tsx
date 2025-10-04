import { FC } from "react"
import { View } from "react-native"
import { format } from "date-fns"

import { BodyText } from "@/components/BodyText"
import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useTeamMemberData } from "@/services/hooks/useTeamMemberData"
import { $styles } from "@/theme/styles"

export const DashboardTeamsScreen: FC<DashboardTabScreenProps<"DashboardTeams">> =
  function DashboardTeamsScreen(_props) {
    const { logout } = useAuth()
    const { teamMemberData } = useTeamMemberData()
    const firstTeamMember = teamMemberData?.[0]

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
        {firstTeamMember && (
          <BodyText variant="body4">
            {firstTeamMember.first_name} {firstTeamMember.last_name}
            {"\n"}
            {format(firstTeamMember.start_time!, "HH:mm")} -{" "}
            {format(firstTeamMember.end_time!, "HH:mm")}
            {"\n"}
            {firstTeamMember.designation_title}
            {"\n"}
            {firstTeamMember.location_name}
          </BodyText>
        )}
        <View>
          <Button onPress={logout}> Log out </Button>
        </View>
      </Screen>
    )
  }

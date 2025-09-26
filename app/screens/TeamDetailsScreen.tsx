import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import { TeamStackParamList } from "@/navigators/TeamNavigator"
import { useAppTheme } from "@/theme/context"
import { $container, $styles } from "@/theme/styles"

type TeamDetailsRoute = RouteProp<TeamStackParamList, "TeamDetails">
type DashboardTeamsNav = NativeStackNavigationProp<TeamStackParamList, "TeamDetails">

export const TeamDetailsScreen = () => {
  const { themed } = useAppTheme()

  const {
    params: { userId },
  } = useRoute<TeamDetailsRoute>()

  const navigation = useNavigation<DashboardTeamsNav>()

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.barContainer, themed($container)]}
    >
      <BackHeader title={"Profile"} navigation={navigation} />
      <BodyText>User ID: {userId}</BodyText>
    </Screen>
  )
}

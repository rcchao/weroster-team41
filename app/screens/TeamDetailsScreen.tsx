import { FC } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import type { AppStackParamList } from "@/navigators/AppNavigator"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { useAppTheme } from "@/theme/context"
import { $container, $styles } from "@/theme/styles"

type TeamDetailsRoute = RouteProp<AppStackParamList, "TeamDetails">

interface TeamDetailsScreenProps extends AppStackScreenProps<"TeamDetails"> {}

export const TeamDetailsScreen: FC<TeamDetailsScreenProps> = function TeamDetailsScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props

  const {
    params: { userId },
  } = useRoute<TeamDetailsRoute>()
  const { profile } = useProfile(userId)

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.barContainer, themed($container)]}
    >
      <BackHeader title={"Profile"} navigation={navigation} />
      {profile && <BodyText>{JSON.stringify(profile)}</BodyText>}
    </Screen>
  )
}

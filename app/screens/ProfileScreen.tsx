import { FC } from "react"

import { BackHeader } from "@/components/BackHeader"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <BackHeader navigation={navigation} title="Profile" />
    </Screen>
  )
}

export default ProfileScreen

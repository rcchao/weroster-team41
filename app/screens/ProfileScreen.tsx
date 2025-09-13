import { FC } from "react"

import { BackHeader } from "@/components/BackHeader"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { $styles } from "@/theme/styles"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props

  const handleSavePress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader navigation={navigation} title="Profile" onSavePress={handleSavePress} />
    </Screen>
  )
}

export default ProfileScreen

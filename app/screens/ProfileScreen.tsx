import { FC } from "react"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { $styles } from "@/theme/styles"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props
  const { profile } = useProfile()

  const handleSavePress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader navigation={navigation} title="Profile" onSavePress={handleSavePress} />
      <BodyText variant="body4">{profile ? JSON.stringify(profile) : "Loading..."}</BodyText>
    </Screen>
  )
}

export default ProfileScreen

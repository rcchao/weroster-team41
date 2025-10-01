import { FC } from "react"
import { YStack } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { ProfileInfoCard } from "@/components/ProfileInfoCard"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { $styles } from "@/theme/styles"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props
  // Should consider what to render when profile is undefined here
  const { profile } = useProfile()

  const handleSavePress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader navigation={navigation} title="Profile" onSavePress={handleSavePress} />
      <BodyText variant="body4">{profile ? JSON.stringify(profile) : "Loading..."}</BodyText>
      <YStack justifyContent="center" alignItems="center">
        <ProfileInfoCard profile={profile} />
      </YStack>
    </Screen>
  )
}

export default ProfileScreen

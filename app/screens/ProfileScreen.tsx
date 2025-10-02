import { FC } from "react"
import { Spinner, YStack } from "tamagui"

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
  const { profile, error, isFetching, isPending } = useProfile()

  // Can be refactored - useProfile() should return isLoading
  const isLoading = isPending || isFetching

  const handleSavePress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <BackHeader navigation={navigation} title="Profile" onSavePress={handleSavePress} />
      {isLoading && (
        <YStack alignItems="center" justifyContent="center" py="$6" gap="$3">
          <Spinner size="large" />
          <BodyText variant="body" opacity={0.7}>
            Loading your profile...
          </BodyText>
        </YStack>
      )}

      {!isLoading && error && (
        <YStack px="$3" py="$4">
          <BodyText variant="body">Couldn’t load your profile</BodyText>
          <BodyText variant="body2" opacity={0.7}>
            {error ? error.message : "Please try again."}
          </BodyText>
        </YStack>
      )}

      {profile && (
        <YStack justifyContent="center" alignItems="center" margin={20} marginBlockStart={40}>
          <ProfileInfoCard profile={profile} />
        </YStack>
      )}
    </Screen>
  )
}

export default ProfileScreen

import { FC, useState } from "react"
import { Spinner, YStack, Button } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { ProfileInfoCard } from "@/components/ProfileInfoCard"
import { Screen } from "@/components/Screen"
import { useAuth, useAuthenticatedUserId } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { $styles } from "@/theme/styles"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  const { navigation } = _props
  const { logout } = useAuth()
  const userId = useAuthenticatedUserId()
  const { profile, error, isFetching, isPending } = useProfile(userId)

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Can be refactored - useProfile() should return isLoading
  const isLoading = isPending || isFetching

  const handleSavePress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)

    try {
      // logout is synchronous
      await new Promise((resolve) => setTimeout(resolve, 600))
      logout()
    } finally {
      setIsLoggingOut(false)
    }
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
            {error.message}
          </BodyText>
        </YStack>
      )}

      <YStack
        justifyContent="center"
        alignItems="center"
        margin={20}
        marginBlockStart={40}
        gap={30}
      >
        {profile && <ProfileInfoCard profile={profile} />}
        <Button
          width="50%"
          borderRadius="$radius.10"
          borderColor="$red900"
          backgroundColor="$red500"
          fontWeight={900}
          onPress={handleLogout}
          disabled={isLoggingOut ? true : false}
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </Button>
      </YStack>
    </Screen>
  )
}

export default ProfileScreen

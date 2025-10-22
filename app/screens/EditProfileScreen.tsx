import { FC, useRef, useState } from "react"
import { Pressable } from "react-native"
import { Avatar, Form, ScrollView, Spinner, useTheme, XStack, YStack } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import { BodyText } from "@/components/BodyText"
import { HeaderText } from "@/components/HeaderText"
import { InputField } from "@/components/InputField"
import { Screen } from "@/components/Screen"
import { useAuthenticatedUserId } from "@/context/AuthContext"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { getInitials } from "@/utils/nameFormatting"

interface EditProfileScreenProps extends AppStackScreenProps<"EditProfileScreen"> {}

export const EditProfileScreen: FC<EditProfileScreenProps> = function EditProfileScreen(_props) {
  const { navigation } = _props
  const theme = useTheme()

  const userId = useAuthenticatedUserId()
  const { profile, error, isFetching, isPending } = useProfile(userId)

  // Can be refactored - useProfile() should return isLoading
  const isLoading = isPending || isFetching
  const [isSaving, setIsSaving] = useState(false)

  const initials = getInitials(profile?.first_name ?? "", profile?.last_name ?? "")

  const formRef = useRef<{ firstName: string; lastName: string; phone: string }>({
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    phone: profile?.phone ?? "",
  })

  const handleSubmit = async (_event?: any) => {
    if (isSaving) return
    setIsSaving(true)
    try {
      const { firstName, lastName, phone } = formRef.current
      console.log("Saving user input:", { firstName, lastName, phone })
      await new Promise((r) => setTimeout(r, 1000))
      navigation.goBack()
    } catch (e) {
      console.log(e)
    } finally {
      setIsSaving(false)
    }
  }

  const SaveButton = (
    <Form.Trigger asChild>
      <Pressable
        testID="save-button"
        disabled={isSaving}
        style={({ pressed }) => ({ opacity: isSaving ? 0.5 : pressed ? 0.7 : 1 })}
      >
        <HeaderText
          variant="h3"
          color={isSaving ? (theme.white50?.val ?? theme.white100.val) : theme.white100.val}
          mx="$4"
        >
          {isSaving ? "Saving..." : "Save"}
        </HeaderText>
      </Pressable>
    </Form.Trigger>
  )

  return (
    <Screen safeAreaEdges={["top"]}>
      <Form onSubmit={handleSubmit} height="100%">
        <BackHeader navigation={navigation} title="Edit Profile" right={SaveButton} />

        <YStack flex={1} paddingTop={50}>
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

          <ScrollView flexGrow={1}>
            {profile && (
              <YStack padding={40} gap={16}>
                <XStack justifyContent="center">
                  <Avatar circular size="$10">
                    <Avatar.Fallback
                      backgroundColor="$secondary400"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <HeaderText variant="h1">{initials}</HeaderText>
                    </Avatar.Fallback>
                  </Avatar>
                </XStack>
                <InputField
                  label="First Name"
                  defaultValue={profile.first_name}
                  onChangeText={(t) => (formRef.current.firstName = t)}
                />
                <InputField
                  label="Last Name"
                  defaultValue={profile.last_name}
                  onChangeText={(t) => (formRef.current.lastName = t)}
                />
                {profile.designation && (
                  <InputField
                    label="Designation"
                    disabled={true}
                    defaultValue={profile.designation?.title}
                  />
                )}
                {profile.phone && (
                  <InputField
                    label="Phone Number"
                    defaultValue={profile.phone}
                    onChangeText={(t) => (formRef.current.phone = t)}
                  />
                )}
                <InputField label="Email" disabled={true} defaultValue={profile.email} />
              </YStack>
            )}
          </ScrollView>
        </YStack>
      </Form>
    </Screen>
  )
}

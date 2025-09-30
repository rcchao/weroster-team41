import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Avatar, Card, useTheme, XStack, YStack } from "tamagui"

import type { AppStackParamList } from "@/navigators/AppNavigator"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { HeaderText } from "./HeaderText"
import { PressableIcon } from "./Icon"

interface TeamMemberCardProps {
  name: string
  userId: number | undefined
}

export const TeamMemberCard = (props: TeamMemberCardProps) => {
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const goToUser = () => {
    if (!props.userId) return
    navigation.navigate("TeamDetails", { userId: props.userId })
  }

  return (
    <Card
      backgroundColor="$white200"
      height={140}
      width={347}
      justifyContent="center"
      paddingBlock="$2"
      paddingInline="$3"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
      borderRadius="$radius.4"
    >
      <XStack justifyContent="space-between">
        <XStack gap="$4" alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image accessibilityLabel="Team member avatar" />
            <Avatar.Fallback backgroundColor="$secondary400" />
          </Avatar>
          <YStack gap="$2">
            <HeaderText variant="h2">{props.name}</HeaderText>
            <YStack gap="$1.5">
              <XStack alignItems="center" gap="$1">
                <StyledIcon icon="clock" />
                <BodyText variant="body2">Shift time</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <StyledIcon icon="stethoscope" />
                <BodyText variant="body2">Role name</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <StyledIcon icon="location" />
                <BodyText variant="body2">Shift location</BodyText>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
        <YStack justifyContent="center" paddingInlineEnd="$3">
          <PressableIcon icon="right" color={theme.accent500.val} onPress={goToUser} />
        </YStack>
      </XStack>
    </Card>
  )
}

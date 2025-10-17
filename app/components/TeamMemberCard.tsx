import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { Avatar, Card, useTheme, XStack, YStack } from "tamagui"

import type { AppStackParamList } from "@/navigators/AppNavigator"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { HeaderText } from "./HeaderText"
import { PressableIcon } from "./Icon"

interface TeamMemberCardProps {
  name: string
  userId?: number
  startDate: Date
  endDate: Date
  role: string
  location: string
}

export const TeamMemberCard = (props: TeamMemberCardProps) => {
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const startDateStr = format(props.startDate, "d MMM")
  const endDateStr = format(props.endDate, "d MMM")
  const startTimeStr = format(props.startDate, "HH:mm")
  const endTimeStr = format(props.endDate, "HH:mm")
  const isOvernightShift = startTimeStr > endTimeStr

  const displayDate = isOvernightShift
    ? `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr}`
    : `${startDateStr} ${startTimeStr} - ${endTimeStr}`

  const goToUser = () => {
    if (!props.userId) return
    navigation.navigate("TeamDetails", { userId: props.userId })
  }

  return (
    <Card
      backgroundColor="$white200"
      height={140}
      width="100%"
      justifyContent="center"
      paddingInline="$3"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
      borderRadius="$radius.4"
    >
      <XStack justifyContent="space-between">
        <XStack marginLeft="$2" gap="$4" alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="Team member avatar"
              src={require("../../assets/images/default-avatar.png")}
            />
            <Avatar.Fallback backgroundColor="$secondary400" />
          </Avatar>
          <YStack gap="$2.5" marginBottom="$3">
            <HeaderText variant="h2">{props.name}</HeaderText>
            <YStack gap="$1.5">
              <XStack alignItems="center" gap="$1.5">
                <StyledIcon icon="clock" />
                <BodyText variant="body2">{displayDate}</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1.5">
                <StyledIcon icon="stethoscope" />
                <BodyText variant="body2">{props.role}</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1.5">
                <StyledIcon icon="location" />
                <BodyText variant="body2">{props.location}</BodyText>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
        <YStack justifyContent="center" paddingInlineEnd="$3">
          {props.userId && (
            <PressableIcon icon="right" color={theme.accent500.val} onPress={goToUser} />
          )}
        </YStack>
      </XStack>
    </Card>
  )
}

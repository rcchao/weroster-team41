import { Avatar, Card, useTheme, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon, PressableIcon } from "./Icon"

interface TeamMemberCardProps {
  name: string
}

export const TeamMemberCard = (props: TeamMemberCardProps) => {
  const theme = useTheme()
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
                <Icon icon="clock" size={16} color={theme.secondary500.val} />
                <BodyText variant="body2">Shift time</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <Icon icon="stethoscope" size={16} color={theme.secondary500.val} />
                <BodyText variant="body2">Role name</BodyText>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <Icon icon="location" size={16} color={theme.secondary500.val} />
                <BodyText variant="body2">Shift location</BodyText>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
        <YStack justifyContent="center" paddingInlineEnd="$3">
          <PressableIcon icon="right" color={theme.accent500.val} onPress={() => <></>} />
        </YStack>
      </XStack>
    </Card>
  )
}

// src={require("../../assets/images/app-icon-all.png")}

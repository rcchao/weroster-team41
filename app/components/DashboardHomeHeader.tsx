import { Pressable } from "react-native"
import type { NavigationProp } from "@react-navigation/native"
import { format } from "date-fns"
import { XStack, YStack, Image, useTheme } from "tamagui"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"

interface DashboardHomeHeaderProps {
  userName: string
  navigation: NavigationProp<any>
}

export const DashboardHomeHeader = ({ userName, navigation }: DashboardHomeHeaderProps) => {
  const theme = useTheme()

  const todayDate = format(new Date(), "EEE, d MMMM yyyy")
  return (
    <XStack
      backgroundColor="$primary500"
      minHeight={150}
      borderBottomLeftRadius="$radius.7"
      borderBottomRightRadius="$radius.7"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
      padding={20}
    >
      <YStack gap={8} width="75%">
        <Image
          source={require("../../assets/images/app-full-logo.png")}
          width={120}
          height={20}
          objectFit="contain"
          marginInlineStart={-10}
        />
        <HeaderText color="$white100" variant="h1">
          Hello, {userName}
        </HeaderText>
        <BodyText color="$white100" variant="body2">
          {todayDate}
        </BodyText>
      </YStack>
      <XStack justifyContent="center" gap={20} width="25%">
        <Pressable onPress={() => navigation.navigate("Notifications")}>
          <Icon icon="notifs" color={theme.white100.val} size={32} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
          <Icon icon="circleUser" color={theme.white100.val} size={32} />
        </Pressable>
      </XStack>
    </XStack>
  )
}

import { Avatar, Card, Separator, XStack, YStack } from "tamagui"

import { ProfileData } from "backend/src/types/auth.types"

import { getAbbreviatedName, getInitials } from "@/utils/nameFormatting"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { PressableIcon } from "./Icon"
import { InfoSection } from "./InfoSection"

interface ProfileInfoCardProps {
  profile: ProfileData
  editable?: boolean
}

export const ProfileInfoCard = ({ profile, editable = true }: ProfileInfoCardProps) => {
  const initials = getInitials(profile.first_name, profile.last_name ?? "")
  const displayName = getAbbreviatedName(profile.first_name, profile.last_name ?? "")

  return (
    <Card
      backgroundColor="$white500"
      borderColor="$mono200"
      borderWidth="$0.5"
      width="100%"
      padding="$4"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <YStack>
        <XStack gap={20}>
          <Avatar circular size="$10">
            <Avatar.Fallback
              backgroundColor="$secondary400"
              justifyContent="center"
              alignItems="center"
            >
              <HeaderText variant="h1">{initials}</HeaderText>
            </Avatar.Fallback>
          </Avatar>
          <YStack flex={1} minWidth={0} marginBlockStart={10}>
            <XStack alignItems="center" justifyContent="space-between" width="95%" gap="$2">
              <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
                {displayName}
              </HeaderText>
              {editable && <PressableIcon icon="edit" size={22} />}
            </XStack>
            <BodyText variant="body2" color="$mono500">
              {profile?.role}
            </BodyText>
          </YStack>
        </XStack>
        <YStack marginBlockStart={30} justifyContent="space-between" gap={10}>
          <InfoSection infoType="phone" info={profile.phone} canCopy={true} />
          <Separator borderColor="$mono300" />
          <InfoSection infoType="email" info={profile.email} canCopy={true} />
          <Separator borderColor="$mono300" />
          <InfoSection infoType="preference" />
          <Separator borderColor="$mono300" />
          <InfoSection infoType="accreditation" />
        </YStack>
      </YStack>
    </Card>
  )
}

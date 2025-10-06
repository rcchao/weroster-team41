import { useTheme, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon, type IconTypes } from "./Icon"

type InfoType = "phone" | "email" | "preference" | "accreditation"

interface InfoSectionProps {
  infoType: InfoType
  info?: string | null
  canCopy?: boolean
}

export const INFO_META_MAP: Record<InfoType, { title: string; icon: IconTypes }> = {
  phone: { title: "Phone Number", icon: "phone" },
  email: { title: "Email Address", icon: "mail" },
  preference: { title: "Preference", icon: "heart" },
  accreditation: { title: "Accreditation", icon: "cross" },
}

export const InfoSection = ({ infoType, info, canCopy = false }: InfoSectionProps) => {
  const theme = useTheme()
  const meta = INFO_META_MAP[infoType]

  return (
    <XStack alignItems="center" marginInline={10} justifyContent="space-between">
      <XStack alignItems="center" gap={20}>
        <Icon icon={meta.icon} size={20} color={theme.secondary500.val} />
        <YStack>
          <BodyText variant="body" color="$secondary800">
            {meta.title}
          </BodyText>
          <BodyText variant="body2" color="$mono900">
            {info ?? "N/A"}
          </BodyText>
        </YStack>
      </XStack>
      {canCopy && <Icon icon="copy" size={20} color={theme.mono600.val} />}
    </XStack>
  )
}

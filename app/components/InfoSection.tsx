import { useState } from "react"
import { Pressable } from "react-native"
import * as Clipboard from "expo-clipboard"
import Toast from "react-native-toast-message"
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

  const hasCopyValue = info && info.trim().length > 0
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (!hasCopyValue) {
      Toast.show({
        type: "error",
        text1: "Nothing to copy",
      })
      return
    }
    await Clipboard.setStringAsync(info!)
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
    })

    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

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
      {canCopy && (
        <Pressable onPress={onCopy} disabled={!hasCopyValue} hitSlop={8}>
          <Icon
            icon={copied ? "check" : "copy"}
            size={20}
            color={copied ? theme.green600.val : theme.mono600.val}
          />
        </Pressable>
      )}
    </XStack>
  )
}

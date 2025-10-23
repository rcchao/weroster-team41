import { Input, YStack } from "tamagui"

import { HeaderText } from "./HeaderText"

interface InputFieldProps {
  label: string
  disabled?: boolean
  defaultValue: string | undefined
  onChangeText?: (text: string) => void
}

export const InputField = ({
  label,
  disabled = false,
  defaultValue,
  onChangeText,
}: InputFieldProps) => {
  return (
    <YStack gap={8}>
      <HeaderText variant="h3">{label}</HeaderText>
      <Input
        size="$4"
        padding={12}
        fontSize="$2"
        borderColor="$mono400"
        backgroundColor="$white100"
        disabled={disabled}
        disabledStyle={$disabledStyle}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
    </YStack>
  )
}

const $disabledStyle = {
  backgroundColor: "transparent",
  color: "$mono400",
} as const

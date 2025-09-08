import React, { forwardRef } from "react"
import { TextInput, StyleSheet } from "react-native"
import { Input, YStack, XStack, Paragraph } from "tamagui"

const styles = StyleSheet.create({
  align: { alignItems: "center" },
  right: { right: 13 },
})

type UserInputProps = React.ComponentProps<typeof Input> & {
  errorMessage?: string
  RightAccessory?: (props: { style?: any }) => React.ReactNode
}

export const UserInput = forwardRef<TextInput, UserInputProps>(
  ({ errorMessage, RightAccessory, ...rest }, ref) => {
    return (
      <YStack gap="$2">
        <XStack position="relative" style={styles.align}>
          <Input ref={ref} flex={1} {...rest} />
          {RightAccessory ? (
            <XStack position="absolute" style={styles.right}>
              {RightAccessory({ style: undefined })}
            </XStack>
          ) : null}
        </XStack>
        {errorMessage ? (
          <Paragraph size="$2" color="$red500">
            {errorMessage}
          </Paragraph>
        ) : null}
      </YStack>
    )
  },
)

UserInput.displayName = "UserInput"

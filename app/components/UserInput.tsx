import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Input, YStack, XStack, Paragraph } from "tamagui"

interface UserInputProps extends React.ComponentProps<typeof Input> {
  errorMessage?: string
  RightAccessory?: (props: { style?: any }) => ReactNode
}

export const UserInput = forwardRef<ComponentRef<typeof Input>, UserInputProps>(
  ({ errorMessage, RightAccessory, ...rest }, ref) => {
    return (
      <YStack gap="$2">
        <XStack position="relative" alignItems="center">
          <Input ref={ref} flex={1} {...rest} />
          {RightAccessory && (
            <XStack position="absolute" right={13}>
              {RightAccessory({ style: undefined })}
            </XStack>
          )}
        </XStack>
        {errorMessage && (
          <Paragraph size="$2" color="$red500">
            {errorMessage}
          </Paragraph>
        )}
      </YStack>
    )
  },
)

UserInput.displayName = "UserInput"

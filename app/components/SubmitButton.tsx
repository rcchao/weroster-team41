import { Button } from "tamagui"

interface SubmitButtonProps {
  text?: string
  onPress: () => void
  disabled?: boolean
}

export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      backgroundColor="$secondary500"
      color="$white100"
      borderRadius="$full"
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.text}
    </Button>
  )
}

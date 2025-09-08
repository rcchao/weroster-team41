import { StyledButton } from "@/theme/styles"

type SubmitButtonProps = {
  text?: string
  onPress: () => void
  disabled?: boolean
}

export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <StyledButton onPress={props.onPress} disabled={props.disabled}>
      {props.text}
    </StyledButton>
  )
}

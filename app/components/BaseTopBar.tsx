import { XStack } from "tamagui"

interface BaseTopBarProps {
  children?: React.ReactNode
}

const BaseTopBar = ({ children }: BaseTopBarProps) => {
  return (
    <XStack
      position="absolute"
      top={0}
      backgroundColor="$color.primary500"
      width="100%"
      height={56}
      borderBottomLeftRadius={"$radius.4"}
      borderBottomRightRadius={"$radius.4"}
      boxShadow={"0px 5px 10px rgba(0, 0, 0, 0.5)"}
      padding={10}
      zIndex={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {children}
    </XStack>
  )
}

export { BaseTopBar }

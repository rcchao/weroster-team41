import { useTheme, XStack } from "tamagui"

import { HeaderText } from "@/components/HeaderText"

import { BaseTopBar } from "./BaseTopBar"

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const theme = useTheme()

  return (
    <BaseTopBar>
      <XStack alignItems="center" gap="$4">
        <HeaderText variant="h2" color={theme.white100.val}>
          {title}
        </HeaderText>
      </XStack>
    </BaseTopBar>
  )
}

export { Header }

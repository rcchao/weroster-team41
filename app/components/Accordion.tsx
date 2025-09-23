import { useState, type ReactNode } from "react"
import { View, Button } from "tamagui"
import { useTheme } from "tamagui"
import { XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

interface AccordionProps {
  sectionText: string
  children: ReactNode
  isCurrent: boolean
}

const Accordion = ({ sectionText, children, isCurrent = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const backgroundColor = isCurrent ? theme.secondary500.val : theme.mono100.val

  sectionText = isCurrent ? "Today - " + sectionText : sectionText

  return (
    <View marginBottom={16} width="100%">
      <XStack width="100%">
        <Button
          onPress={toggleAccordion}
          borderRadius={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          paddingVertical={12}
          paddingHorizontal={16}
          backgroundColor={backgroundColor}
          width="100%"
          height={48}
          gap={2}
          unstyled
        >
          <Icon icon={isOpen ? "down" : "right"} size={20} color={theme.mono900.val} />
          <BodyText>{sectionText.toUpperCase()}</BodyText>
        </Button>
      </XStack>
      {isOpen && (
        <View marginTop={8} paddingHorizontal={16}>
          {children}
        </View>
      )}
    </View>
  )
}

export { Accordion }

import { type ReactNode, useState } from "react"
import { useTheme, View, Accordion, Square } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

interface AccordionSection {
  sectionText: string
  children: ReactNode
  isCurrent: boolean
}

interface Props {
  sections: AccordionSection[]
}

const AccordionDropdown = ({ sections }: Props) => {
  const theme = useTheme()
  const [openSections, setOpenSections] = useState<string[]>([])

  const doChange = (values: string[]) => {
    setOpenSections(values)
  }

  return (
    <Accordion type="multiple" collapsable value={openSections} onValueChange={doChange}>
      {sections.map((section, index) => {
        const backgroundColor = section.isCurrent ? theme.secondary500.val : theme.mono100.val
        const sectionText = section.isCurrent
          ? "TODAY - " + section.sectionText
          : section.sectionText
        const textColor = section.isCurrent ? theme.mono100.val : theme.mono900.val
        const currentSectionValue = `section-${index}`
        const isOpen = openSections.includes(currentSectionValue)

        return (
          <Accordion.Item key={index} value={currentSectionValue}>
            <Accordion.Header>
              <Accordion.Trigger
                borderRadius={0}
                borderWidth={0}
                flexDirection="row"
                alignItems="center"
                paddingVertical={12}
                paddingHorizontal={16}
                backgroundColor={backgroundColor}
                width="100%"
                height={48}
              >
                <Square animation="quick" rotate={isOpen ? "90deg" : "0deg"}>
                  <Icon icon={"right"} size={20} color={textColor} />
                </Square>

                <View flexDirection="row" alignItems="center" gap={8}>
                  <BodyText color={textColor}>{sectionText.toUpperCase()}</BodyText>
                </View>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.HeightAnimator animation="medium">
              <Accordion.Content>{section.children}</Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export { AccordionDropdown }

import { useTheme, XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon, IconTypes } from "./Icon"

type TimeSection = "AM" | "PM" | "AH"

interface TeamRosterShiftTabBarProps {
  timeSection: TimeSection
  setTimeSection: (section: TimeSection) => void
}

const TeamRosterShiftTabBar = ({ timeSection, setTimeSection }: TeamRosterShiftTabBarProps) => {
  const theme = useTheme()

  const handlePress = (section: TimeSection) => {
    console.log(section)
    setTimeSection(section)
  }

  const sections: { key: TimeSection; icon: IconTypes; bg_color: string }[] = [
    { key: "AM", icon: "am", bg_color: theme.yellow200.val },
    { key: "PM", icon: "pm", bg_color: theme.red200.val },
    { key: "AH", icon: "moon", bg_color: theme.secondary200.val },
  ]

  const getBackgroundColor = (section: TimeSection) => {
    if (section !== timeSection) return theme.white500.val

    return sections.find((s) => s.key === section)?.bg_color
  }

  return (
    <XStack
      height={40}
      width="100%"
      justifyContent="space-around"
      alignItems="center"
      zIndex={2}
      backgroundColor={theme.white500.val}
    >
      {sections.map((section) => (
        <XStack
          key={section.key}
          flex={1}
          height="100%"
          backgroundColor={getBackgroundColor(section.key)}
          alignItems="center"
          justifyContent="center"
          gap={6}
          borderColor={theme.mono500.val}
          borderWidth={1}
          borderTopRightRadius={"$radius.4"}
          borderTopLeftRadius={"$radius.4"}
          animation="quick"
          animateOnly={["backgroundColor"]}
          onPress={() => handlePress(section.key)}
        >
          <Icon icon={section.icon} size={16} color={theme.mono900.val} />
          <BodyText variant="body" color={theme.mono900.val}>
            {section.key}
          </BodyText>
        </XStack>
      ))}
    </XStack>
  )
}

export { TeamRosterShiftTabBar }

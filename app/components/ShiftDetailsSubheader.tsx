import { differenceInHours, format } from "date-fns"
import { useTheme, XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

const SESSION_COLOUR_MAP: Record<string, string> = {
  AM: "yellow300",
  PM: "red300",
  AH: "secondary300",
}

interface ShiftDetailsSubheaderProps {
  start: Date
  end: Date
  session: string
}

export const ShiftDetailsSubheader = ({ start, end, session }: ShiftDetailsSubheaderProps) => {
  const theme = useTheme()

  const displayDate = format(start, "EEE, d MMM")
  const timeRange = `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`
  const duration = differenceInHours(end, start)

  const dateIcon = session === "AM" || session === "PM" ? "sun" : "moon"
  const bgColor = theme[SESSION_COLOUR_MAP[session]]?.val ?? theme.white100.val

  return (
    <XStack backgroundColor="$white500" width="100%" justifyContent="space-between" padding={16}>
      <XStack
        backgroundColor="$white100"
        padding={8}
        alignItems="center"
        justifyContent="center"
        borderRadius="$3"
        minWidth={110}
        gap="$2"
      >
        <Icon icon={dateIcon} size={16} />
        <BodyText variant="body3">{displayDate}</BodyText>
      </XStack>
      <XStack
        backgroundColor={bgColor}
        padding={8}
        alignItems="center"
        justifyContent="center"
        borderRadius="$3"
        minWidth={100}
      >
        <BodyText variant="body3">{timeRange}</BodyText>
      </XStack>
      <XStack
        backgroundColor="$white100"
        padding={8}
        alignItems="center"
        justifyContent="center"
        borderRadius="$3"
        minWidth={110}
        gap="$2"
      >
        <Icon icon="clock" size={16} />
        <BodyText variant="body3">{duration} hours</BodyText>
      </XStack>
    </XStack>
  )
}

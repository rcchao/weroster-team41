import { differenceInHours, format } from "date-fns"
import { useTheme, XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

export const SESSION_LABEL_BG_COLOUR_MAP: Record<Session, string> = {
  AM: "yellow300",
  PM: "red300",
  AH: "secondary300",
}

export type Session = "AM" | "PM" | "AH"

interface ShiftDetailsSubheaderProps {
  startDate: Date
  endDate: Date
  session: Session
}

export const ShiftDetailsSubheader = ({
  startDate,
  endDate,
  session,
}: ShiftDetailsSubheaderProps) => {
  const theme = useTheme()

  const displayDate = format(startDate, "EEE, d MMM")
  const timeRange = `${format(startDate, "HH:mm")} - ${format(endDate, "HH:mm")}`
  const duration = differenceInHours(endDate, startDate)

  const dateIcon = session === "AM" || session === "PM" ? "sun" : "moon"
  const bgColor = theme[SESSION_LABEL_BG_COLOUR_MAP[session]]?.val ?? theme.white100.val

  return (
    <XStack backgroundColor="$white500" width="100%" justifyContent="space-between" padding={16}>
      <XStack
        backgroundColor="$white100"
        padding={8}
        alignItems="center"
        justifyContent="center"
        borderRadius="$3"
        minWidth={100}
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
        minWidth={90}
      >
        <BodyText variant="body3">{timeRange}</BodyText>
      </XStack>
      <XStack
        backgroundColor="$white100"
        padding={8}
        alignItems="center"
        justifyContent="center"
        borderRadius="$3"
        minWidth={100}
        gap="$2"
      >
        <Icon icon="clock" size={16} />
        <BodyText variant="body3">{duration} hours</BodyText>
      </XStack>
    </XStack>
  )
}

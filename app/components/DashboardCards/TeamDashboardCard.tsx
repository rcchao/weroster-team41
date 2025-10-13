import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"

interface TeamDashboardCardProps {
  campusName: string
  startDate: Date
  locationName: string
  numAssignments: number
}

export const TeamDashboardCard = ({
  campusName,
  startDate,
  locationName,
  numAssignments,
}: TeamDashboardCardProps) => {
  const displayDate = format(startDate, "EEE, d MMM")
  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      minWidth={200}
      alignSelf="flex-start"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <YStack>
        <HeaderText variant="h2">{campusName}</HeaderText>
        <YStack gap="$1.5">
          <XStack gap="$1.5" alignItems="center">
            <StyledIcon icon="roster" />
            <BodyText variant="body3">{displayDate}</BodyText>
          </XStack>
          <BodyText variant="body3" fontWeight="900">
            {locationName}:<BodyText variant="body3"> {numAssignments} staff</BodyText>
          </BodyText>
        </YStack>
      </YStack>
    </Card>
  )
}

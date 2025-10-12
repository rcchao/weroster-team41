import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "../BodyText"
import { StyledIcon } from "../common/StyledIcon"
import { HeaderText } from "../HeaderText"
import { Lozenge, LozengeType } from "../Lozenge"

interface OpenShiftDashboardCardProps {
  startDate: Date
  endDate: Date
  campus?: string
  activity: string | null
  extraPay: number | null
  openShiftStatus: LozengeType
}

export const OpenShiftDashboardCard = ({
  startDate,
  endDate,
  campus,
  activity,
  extraPay,
  openShiftStatus,
}: OpenShiftDashboardCardProps) => {
  const displayDate = format(startDate, "EEE, d MMM")
  const timeRange = `${format(startDate, "H:mm")} - ${format(endDate, "H:mm")}`

  return (
    <Card
      backgroundColor="$white200"
      padding={18}
      paddingBlockStart={12}
      minWidth={260}
      alignSelf="flex-start"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack justifyContent="space-between">
        <YStack alignSelf="flex-start">
          <HeaderText variant="h2" numberOfLines={1} ellipsizeMode="tail">
            {displayDate}
          </HeaderText>
          <YStack gap="$1.5">
            <XStack gap="$1.5" alignItems="center">
              <StyledIcon icon="clock" />
              <BodyText variant="body3">{timeRange}</BodyText>
            </XStack>
            {campus && (
              <XStack gap="$1.5" alignItems="center">
                <StyledIcon icon="building" />
                <BodyText variant="body3">{campus}</BodyText>
              </XStack>
            )}
            <XStack gap="$1.5" alignItems="center">
              <StyledIcon icon="stethoscope" />
              <BodyText variant="body3">{activity}</BodyText>
            </XStack>
            <XStack gap="$1.5" alignItems="center">
              <BodyText variant="body2" color="$secondary500">
                +${extraPay}{" "}
                <BodyText variant="body2" color="$secondary500" fontWeight={900}>
                  extra pay
                </BodyText>
              </BodyText>
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={5}>
          <Lozenge type={openShiftStatus} />
        </YStack>
      </XStack>
    </Card>
  )
}

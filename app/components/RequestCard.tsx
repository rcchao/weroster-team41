import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Lozenge } from "./Lozenge"
import { RequestTypeIcon } from "./RequestTypeIcon"

export type RequestType = "LEAVE" | "SWAP" | "ASSIGNMENT"

interface RequestCardProps {
  requestType: RequestType
  date: Date
  status: "APPROVED" | "AWAITING" | "DECLINED"
}

const REQUEST_MAP: Record<RequestType, string> = {
  LEAVE: "Leave",
  SWAP: "Swap",
  ASSIGNMENT: "OpenShift",
}

export const RequestCard = (props: RequestCardProps) => {
  const displayDate = format(props.date, "EEE, d MMM")
  return (
    <Card
      width={350}
      height={104}
      backgroundColor="$white200"
      justifyContent="center"
      padding="$3"
      borderRadius="$radius.8"
      elevation={4}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.25}
      shadowRadius={4}
    >
      <XStack width="auto" gap="$3" justifyContent="space-between">
        <XStack gap="$2">
          <RequestTypeIcon requestType={props.requestType} />
          <YStack gap="$2">
            <BodyText
              variant="body3"
              backgroundColor="$mono100"
              paddingBlock="$2"
              paddingInline="$3"
              borderRadius="$radius.8"
            >
              {REQUEST_MAP[props.requestType]} Request
            </BodyText>
            <YStack gap="$1">
              <BodyText variant="body3" marginInlineStart="$2">
                On {displayDate}
              </BodyText>
              <BodyText variant="body3" marginInlineStart="$2">
                Description
              </BodyText>
            </YStack>
          </YStack>
        </XStack>
        <YStack justifyContent="center" marginInlineEnd="$2">
          <Lozenge type={props.status} />
        </YStack>
      </XStack>
    </Card>
  )
}

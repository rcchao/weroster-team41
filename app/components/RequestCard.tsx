import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Lozenge } from "./Lozenge"
import { RequestTypeIcon } from "./RequestTypeIcon"

type RequestType = "leave" | "swap" | "openShift"

interface RequestCardProps {
  requestType: RequestType
  date: Date
  status:
    | "leave"
    | "swap"
    | "event"
    | "available"
    | "requested"
    | "urgent"
    | "approved"
    | "awaiting"
    | "declined"
    | "assigned"
    | "openShift"
}

const REQUEST_MAP: Record<RequestType, string> = {
  leave: "Leave",
  swap: "Swap",
  openShift: "OpenShift",
}

export const RequestCard = (props: RequestCardProps) => {
  const displayDate = format(props.date, "EEE, d MMM")
  return (
    <Card
      elevate
      width={350}
      height={104}
      backgroundColor="$white200"
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.2)"}
      justifyContent="center"
      padding="$3"
      borderRadius="$radius.8"
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

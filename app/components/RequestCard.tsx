import { format } from "date-fns"
import { Card, XStack, YStack } from "tamagui"

import { BodyText } from "./BodyText"
import { Lozenge } from "./Lozenge"
import { RequestTypeIcon } from "./RequestTypeIcon"

export type RequestType = "LEAVE" | "SWAP" | "ASSIGNMENT"
export type RequestStatus = "APPROVED" | "AWAITING" | "DECLINED"
export type LeaveType = "SICK" | "ANNUAL" | "COMPASSIONATE" | "PARENTAL" | "UNPAID"

interface RequestCardProps {
  requestType: RequestType
  startDate: Date
  endDate: Date
  status: RequestStatus
  leaveType?: LeaveType
}

const REQUEST_MAP: Record<RequestType, string> = {
  LEAVE: "Leave",
  SWAP: "Swap",
  ASSIGNMENT: "OpenShift",
}

const LEAVE_TYPE_MAP: Record<LeaveType, string> = {
  SICK: "Sick",
  ANNUAL: "Annual",
  COMPASSIONATE: "Compassionate",
  PARENTAL: "Parental",
  UNPAID: "Unpaid",
}

export const RequestCard = (props: RequestCardProps) => {
  const startDateStr = format(props.startDate, "EEE, d MMM")
  const endDateStr = format(props.endDate, "EEE, d MMM")
  const startTimeStr = format(props.startDate, "HH:mm")
  const endTimeStr = format(props.endDate, "HH:mm")
  const isOvernightShift = startTimeStr > endTimeStr

  let displayDate: string
  let description: string

  if (props.requestType === "LEAVE") {
    displayDate = `${startDateStr} - ${endDateStr}`
    description = props.leaveType ? `${LEAVE_TYPE_MAP[props.leaveType]} Leave` : ""
  } else {
    displayDate = isOvernightShift ? `Starts ${startDateStr}` : `On ${startDateStr}`
    description = `${startTimeStr} - ${endTimeStr}`
  }

  return (
    <Card
      width="90%"
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
              style={$requestTitleStyle}
            >
              {REQUEST_MAP[props.requestType]} Request
            </BodyText>
            <YStack gap="$1">
              <BodyText variant="body3" marginInlineStart="$2">
                {displayDate}
              </BodyText>
              <BodyText variant="body3" marginInlineStart="$2">
                {description}
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

const $requestTitleStyle = {
  maxWidth: 140,
  alignSelf: "flex-start",
  flexShrink: 0,
}

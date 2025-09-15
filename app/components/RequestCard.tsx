import { Card, Text, XStack } from "tamagui"

import { RequestTypeIcon } from "./RequestTypeIcon"

export const RequestCard = () => {
  return (
    <Card elevate width={350} height={104} backgroundColor="$white200">
      <XStack>
        <RequestTypeIcon requestType="leave" />
        <Card.Header>
          <Text>Leave Request</Text>
        </Card.Header>
      </XStack>
    </Card>
  )
}

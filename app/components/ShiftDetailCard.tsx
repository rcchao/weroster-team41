import { Button, Card, Separator, TextArea, XStack, YStack } from "tamagui"

import { ShiftWithNumUsers } from "backend/src/types/event.types"

import { useCampusByLocationId } from "@/services/hooks/useCampus"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { Icon } from "./Icon"

interface ShiftDetailCardProps {
  shift: ShiftWithNumUsers
}

const ShiftHeader = ({ location, address }: { location: string; address?: string | null }) => {
  const addressName = address ? address : ""

  return (
    <YStack gap="$2">
      <XStack alignItems="center" gap="$2">
        <StyledIcon icon="building" size={20} />
        <YStack gap="$1.5">
          <BodyText variant="body2">{location}</BodyText>
          <BodyText variant="body4">{addressName}</BodyText>
        </YStack>
      </XStack>
      <XStack alignItems="center" gap="$2">
        <StyledIcon icon="location" size={20} />
        <BodyText variant="body2">Theatre 1</BodyText>
      </XStack>
    </YStack>
  )
}

const WorkingWith = ({ eventAssignments }: { eventAssignments: any[] }) => (
  <YStack gap="$3">
    <XStack alignItems="center" gap="$2">
      <StyledIcon icon="teams" size={20} />
      <BodyText variant="body2">Working with</BodyText>
    </XStack>
    <YStack gap="$2" marginLeft="$2">
      {eventAssignments.map((ea) => (
        <TeamMemberButton key={ea.user.id} name={ea.user.first_name + " " + ea.user.last_name} />
      ))}
    </YStack>
  </YStack>
)

const TeamMemberButton = ({ name }: { name: string }) => (
  <Button
    height={24}
    marginLeft="$4"
    paddingHorizontal="$2.5"
    backgroundColor="$mono100"
    borderRadius="$radius.8"
    alignSelf="flex-start"
  >
    <XStack gap="$2">
      <Icon icon="user2" size={14} />
      <BodyText variant="body3">{name}</BodyText>
    </XStack>
  </Button>
)

const NotesSection = () => (
  <YStack gap="$3">
    <BodyText variant="body2">Notes</BodyText>
    <TextArea
      placeholder="Text"
      size="$2"
      padding="$3"
      borderWidth={1}
      borderColor="$mono400"
      borderRadius="$radius.3"
      height={100}
      backgroundColor="$white100"
    />
  </YStack>
)

const PaySection = ({ amount }: { amount: number }) => (
  <YStack
    gap="$2"
    backgroundColor="$accent100"
    padding="$3"
    borderRadius="$radius.3"
    alignItems="center"
  >
    <BodyText variant="body2">Total pay for this shift</BodyText>
    <BodyText variant="body" scale={1.5}>
      ${amount}
    </BodyText>
    <BodyText variant="body3">Received after completion of shift</BodyText>
  </YStack>
)

const RequestButton = ({ isOpenShift }: { isOpenShift: boolean }) => (
  <Button
    height={36}
    backgroundColor="$secondary500"
    borderRadius="$radius.8"
    justifyContent="center"
    alignItems="center"
    alignSelf="flex-end"
    marginTop="$2"
  >
    <BodyText variant="body2" color="$white100">
      {isOpenShift ? "Request Shift" : "Request Swap"}
    </BodyText>
  </Button>
)

const ShiftDetailCard = ({ shift }: ShiftDetailCardProps) => {
  const { campus } = useCampusByLocationId(shift.location_id)
  const isOpenShift = shift?.numUsers === 0

  return (
    <Card
      backgroundColor="$white100"
      width="100%"
      elevation={2}
      shadowColor="$mono900"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      borderRadius="$radius.4"
      padding="$5"
    >
      <YStack gap="$4" minWidth="100%">
        <ShiftHeader location={shift.location} address={campus?.address} />

        <Separator borderColor="$mono300" />

        {shift.numUsers > 0 && (
          <>
            <WorkingWith eventAssignments={shift.eventAssignments} />
            <Separator borderColor="$mono300" />
          </>
        )}

        {!isOpenShift && <NotesSection />}

        {isOpenShift && <PaySection amount={500} />}

        <RequestButton isOpenShift={isOpenShift} />
      </YStack>
    </Card>
  )
}

export { ShiftDetailCard }

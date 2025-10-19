import { isAfter } from "date-fns"
import Toast from "react-native-toast-message"
import { Button, Card, Dialog, Separator, XStack, YStack } from "tamagui"

import { SwapNotificationActionPayload } from "backend/src/types/action_swap_request.types"
import { RequestStatusType } from "backend/src/types/enums.types"
import { OpenShift, ShiftWithNumUsers } from "backend/src/types/event.types"

import { useAuth } from "@/context/AuthContext"
import { useActionSwapRequestNotif } from "@/services/hooks/useActionSwapRequestNotif"

import { BodyText } from "./BodyText"
import { StyledIcon } from "./common/StyledIcon"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"

interface ShiftDetailCardProps {
  shift: ShiftWithNumUsers
  onPress: (shift: ShiftWithNumUsers | OpenShift) => void
}

interface SwapDetailCardProps {
  shift: ShiftWithNumUsers
  message: string | null
  requiresAction: boolean
  isAccepted?: boolean
  swapNotifId: number
  swapInitiator: number | undefined
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

const WorkingWith = ({
  ignoreIds,
  eventAssignments,
}: {
  ignoreIds: number[]
  eventAssignments: any[]
}) => {
  const visibleEventAssignments = eventAssignments.filter((ea) => !ignoreIds.includes(ea.user.id))

  return (
    <>
      {visibleEventAssignments.length > 0 && (
        <>
          <YStack gap="$3">
            <XStack alignItems="center" gap="$2">
              <StyledIcon icon="teams" size={20} />
              <BodyText variant="body2">Working with</BodyText>
            </XStack>
            <YStack gap="$2" marginLeft="$2">
              {visibleEventAssignments.map((ea) => (
                <TeamMemberButton
                  key={ea.user.id}
                  name={ea.user.first_name + " " + ea.user.last_name}
                />
              ))}
            </YStack>
          </YStack>
          <Separator borderColor="$mono300" />
        </>
      )}
    </>
  )
}

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

const RequestButton = ({ isOpenShift, onPress }: { isOpenShift: boolean; onPress: () => void }) => (
  <Button
    height={36}
    backgroundColor="$secondary500"
    borderRadius="$radius.8"
    justifyContent="center"
    alignItems="center"
    alignSelf="flex-end"
    marginTop="$2"
    onPress={onPress}
  >
    <BodyText variant="body2" color="$white100">
      {isOpenShift ? "Request Shift" : "Request Swap"}
    </BodyText>
  </Button>
)

const AcceptButton = ({ disabled, swapNotifId }: { disabled: boolean; swapNotifId: number }) => {
  const mutation = useActionSwapRequestNotif()
  const actionNotifPayload = {
    swap_notif_id: swapNotifId,
    status: "APPROVED" as RequestStatusType,
  }

  const acceptSwapRequest = async (actionNotifPayload: SwapNotificationActionPayload) => {
    try {
      const data = await mutation.mutateAsync(actionNotifPayload)
      if (data.success) {
        console.log("Posted successfully", data)
        Toast.show({
          type: "success",
          text1: "Successfully accepted swap request",
        })
      } else {
        console.log("Post failed", data.error)
        Toast.show({
          type: "failure",
          text1: "Error! Failed to accept swap request",
        })
      }
    } catch (error) {
      console.error("Error posting:", error)
      Toast.show({
        type: "failure",
        text1: "Error! Something went wrong",
      })
    }
  }

  return (
    <Button
      height={36}
      backgroundColor={disabled ? "$green500" : "$primary500"}
      borderRadius="$radius.8"
      justifyContent="center"
      alignItems="center"
      marginTop="$2"
      onPress={async () => {
        await acceptSwapRequest(actionNotifPayload)
      }}
      disabled={disabled}
    >
      <BodyText variant="body2" color={disabled ? "$green800" : "$white100"}>
        {disabled ? "Accepted" : "Accept"}
      </BodyText>
    </Button>
  )
}

const DeclineButton = ({ disabled, swapNotifId }: { disabled: boolean; swapNotifId: number }) => {
  const mutation = useActionSwapRequestNotif()
  const actionNotifPayload = {
    swap_notif_id: swapNotifId,
    status: "DECLINED" as RequestStatusType,
  }

  const declineSwapRequest = async (actionNotifPayload: SwapNotificationActionPayload) => {
    try {
      const data = await mutation.mutateAsync(actionNotifPayload)
      if (data.success) {
        console.log("Posted successfully", data)
        Toast.show({
          type: "success",
          text1: "Successfully declined swap request",
        })
      } else {
        console.log("Post failed", data.error)
        Toast.show({
          type: "failure",
          text1: "Error! Failed to decline swap request",
        })
      }
    } catch (error) {
      console.error("Error posting:", error)
      Toast.show({
        type: "failure",
        text1: "Error! Something went wrong",
      })
    }
  }

  return (
    <Button
      height={36}
      backgroundColor={disabled ? "$red500" : "$secondary400"}
      borderRadius="$radius.8"
      justifyContent="center"
      alignItems="center"
      marginTop="$2"
      onPress={async () => {
        await declineSwapRequest(actionNotifPayload)
      }}
      disabled={disabled}
    >
      <BodyText variant="body2" color={disabled ? "$red900" : "$white100"}>
        {disabled ? "Declined" : "Decline"}
      </BodyText>
    </Button>
  )
}

const ShiftDetailCard = ({ shift, onPress }: ShiftDetailCardProps) => {
  const now = new Date()
  const { userId } = useAuth()
  const ignoreIds = userId ? [userId] : []
  const isOpenShift = "status" in shift

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
      alignItems="center"
    >
      <YStack gap="$4" minWidth="100%">
        <ShiftHeader location={shift.location} address={shift.campus_address} />

        <Separator borderColor="$mono300" />

        <WorkingWith ignoreIds={ignoreIds} eventAssignments={shift.eventAssignments} />

        {isOpenShift && <PaySection amount={500} />}

        {(!isOpenShift || shift.status !== "REQUESTED") && isAfter(shift.start_time, now) && (
          <Dialog.Close displayWhenAdapted asChild>
            <RequestButton isOpenShift={isOpenShift} onPress={() => onPress?.(shift)} />
          </Dialog.Close>
        )}
      </YStack>
    </Card>
  )
}

const SwapDetailCard = ({
  shift,
  message,
  requiresAction,
  isAccepted,
  swapNotifId,
  swapInitiator,
}: SwapDetailCardProps) => {
  const { userId } = useAuth()
  const ignoreIds = [userId, swapInitiator].filter((id): id is number => id !== undefined)

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
      alignItems="center"
    >
      <YStack gap="$4" minWidth="100%">
        <ShiftHeader location={shift.location} address={shift.campus_address} />

        <Separator borderColor="$mono300" />

        <WorkingWith ignoreIds={ignoreIds} eventAssignments={shift.eventAssignments} />

        <YStack gap={10}>
          <HeaderText variant="h2">Message</HeaderText>
          {message ? (
            <BodyText variant="body2">{message}</BodyText>
          ) : (
            <BodyText variant="body2" color="$mono400">
              This request has no additional message
            </BodyText>
          )}
        </YStack>

        {requiresAction ? (
          <XStack justifyContent="flex-end" gap={10}>
            <DeclineButton disabled={false} swapNotifId={swapNotifId} />
            <AcceptButton disabled={false} swapNotifId={swapNotifId} />
          </XStack>
        ) : (
          <XStack justifyContent="flex-end">
            {isAccepted ? (
              <AcceptButton disabled={true} swapNotifId={swapNotifId} />
            ) : (
              <DeclineButton disabled={true} swapNotifId={swapNotifId} />
            )}
          </XStack>
        )}
      </YStack>
    </Card>
  )
}

export { TeamMemberButton, ShiftDetailCard, SwapDetailCard }

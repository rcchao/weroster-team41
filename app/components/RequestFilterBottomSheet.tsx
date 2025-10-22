import { useState, useEffect } from "react"
import { Pressable } from "react-native"
import { Sheet, XStack, YStack, Separator } from "tamagui"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"
import { Lozenge } from "./Lozenge"
import { RequestStatus, RequestType } from "./RequestCard"

interface RequestFilterBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedTypes: RequestType[]
  setSelectedTypes: (types: RequestType[]) => void
  selectedStatuses: RequestStatus[]
  setSelectedStatuses: (statuses: RequestStatus[]) => void
}

// Define arrays of all possible values
const REQUEST_TYPES: RequestType[] = ["LEAVE", "SWAP", "ASSIGNMENT"]
const REQUEST_STATUSES: RequestStatus[] = ["APPROVED", "AWAITING", "DECLINED"]

const RequestFilterBottomSheet = ({
  open,
  onOpenChange,
  selectedTypes,
  setSelectedTypes,
  selectedStatuses,
  setSelectedStatuses,
}: RequestFilterBottomSheetProps) => {
  // Internal state for temporary selections
  const [tempTypes, setTempTypes] = useState<RequestType[]>(selectedTypes)
  const [tempStatuses, setTempStatuses] = useState<RequestStatus[]>(selectedStatuses)

  // Sync internal state when sheet opens
  useEffect(() => {
    if (open) {
      setTempTypes(selectedTypes)
      setTempStatuses(selectedStatuses)
    }
  }, [open, selectedTypes, selectedStatuses])

  const handleClear = () => {
    setTempTypes([])
    setTempStatuses([])
  }

  const handleApply = () => {
    setSelectedTypes(tempTypes)
    setSelectedStatuses(tempStatuses)
    onOpenChange(false)
  }

  const toggleType = (type: RequestType) => {
    setTempTypes(
      tempTypes.includes(type) ? tempTypes.filter((t) => t !== type) : [...tempTypes, type],
    )
  }

  const toggleStatus = (status: RequestStatus) => {
    setTempStatuses(
      tempStatuses.includes(status)
        ? tempStatuses.filter((s) => s !== status)
        : [...tempStatuses, status],
    )
  }

  return (
    <Sheet modal open={open} onOpenChange={onOpenChange} snapPoints={[40]} dismissOnSnapToBottom>
      <Sheet.Overlay backgroundColor="$mono900" opacity={0.5} />
      <Sheet.Handle />
      <Sheet.Frame backgroundColor="$white100" borderTopLeftRadius="$6" borderTopRightRadius="$6">
        {/* Header */}
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="$4"
          paddingVertical="$3"
          backgroundColor="$white300"
          shadowColor="$mono500"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={3}
          zIndex={1}
        >
          <Pressable onPress={handleClear}>
            <BodyText variant="body2">Clear</BodyText>
          </Pressable>

          <HeaderText variant="h2">Filter</HeaderText>

          <Pressable onPress={handleApply}>
            <BodyText variant="body2" color="$secondary500">
              Apply
            </BodyText>
          </Pressable>
        </XStack>

        <YStack padding="$4" gap="$4">
          {/* Type Section */}
          <YStack gap="$3">
            <XStack alignItems="center" gap="$2">
              <Icon icon="layoutGrid" />
              <HeaderText variant="h3">Type</HeaderText>
            </XStack>

            <Separator borderColor="$mono300" />

            <XStack gap="$2" justifyContent="space-around">
              {REQUEST_TYPES.map((type) => (
                <Lozenge
                  key={type}
                  type={type}
                  active={true}
                  selected={tempTypes.includes(type)}
                  onPress={() => toggleType(type)}
                />
              ))}
            </XStack>
          </YStack>

          {/* Status Section */}
          <YStack gap="$3">
            <XStack alignItems="center" gap="$2">
              <Icon icon="checkCircle" />
              <HeaderText variant="h3">Status</HeaderText>
            </XStack>

            <Separator borderColor="$mono300" />

            <XStack gap="$2" justifyContent="space-around">
              {REQUEST_STATUSES.map((status) => (
                <Lozenge
                  key={status}
                  type={status}
                  active={true}
                  selected={tempStatuses.includes(status)}
                  onPress={() => toggleStatus(status)}
                />
              ))}
            </XStack>
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

export { RequestFilterBottomSheet }

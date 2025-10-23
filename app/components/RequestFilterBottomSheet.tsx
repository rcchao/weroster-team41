import { useState, useEffect } from "react"
import { XStack, YStack, Separator } from "tamagui"

import { BaseFilterBottomSheet } from "./BaseFilterBottomSheet"
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
    <BaseFilterBottomSheet
      open={open}
      onOpenChange={onOpenChange}
      size={40}
      handleClear={handleClear}
      handleApply={handleApply}
    >
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
    </BaseFilterBottomSheet>
  )
}

export { RequestFilterBottomSheet }

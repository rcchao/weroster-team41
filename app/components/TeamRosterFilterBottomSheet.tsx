import { useState } from "react"
import { Pressable } from "react-native"
import { XStack, YStack, Separator } from "tamagui"

import { TeamShift } from "backend/src/types/events.types"

import { BaseFilterBottomSheet } from "./BaseFilterBottomSheet"
import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"
import { Icon } from "./Icon"

interface TeamRosterFilterBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campusShifts: TeamShift[]
}

// Define arrays of all possible values
const Pill = ({
  text,
  selected,
  onPress,
}: {
  text: string
  selected: boolean
  onPress: () => void
}) => {
  const backgroundColor = selected ? "$secondary500" : "$white500"
  const textColor = selected ? "$white100" : "$mono900"

  return (
    <Pressable onPress={onPress}>
      <XStack
        height={36}
        minWidth={36}
        paddingInline={12}
        justifyContent="center"
        alignItems="center"
        backgroundColor={backgroundColor}
        borderRadius="$radius.full"
      >
        <BodyText variant="body2" color={textColor}>
          {text}
        </BodyText>
      </XStack>
    </Pressable>
  )
}

const TeamRosterFilterBottomSheet = ({
  open,
  onOpenChange,
  campusShifts,
}: TeamRosterFilterBottomSheetProps) => {
  const allCampuses = campusShifts.map((c) => c.name)

  // Internal state for temporary selections
  const [tempCampuses, setTempCampuses] = useState<string[]>([])
  const [onlyShowLocWithShifts, setOnlyShowLocWithShifts] = useState(false)

  const handleClear = () => {
    setTempCampuses([])
    setOnlyShowLocWithShifts(false)
  }

  const handleApply = () => {
    onOpenChange(false)
  }

  const toggleCampus = (campus: string) => {
    setTempCampuses(
      tempCampuses.includes(campus)
        ? tempCampuses.filter((c) => c !== campus)
        : [...tempCampuses, campus],
    )
  }

  return (
    <BaseFilterBottomSheet
      open={open}
      onOpenChange={onOpenChange}
      size={50}
      handleClear={handleClear}
      handleApply={handleApply}
    >
      <YStack padding="$4" gap="$4">
        {/* Type Section */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Icon icon="building" />
            <HeaderText variant="h3">Campus</HeaderText>
          </XStack>

          <Separator borderColor="$mono300" />

          <XStack gap="$2" flexWrap="wrap">
            {allCampuses.map((campus) => (
              <Pill
                key={campus}
                text={campus}
                selected={tempCampuses.includes(campus)}
                onPress={() => toggleCampus(campus)}
              />
            ))}
          </XStack>
        </YStack>

        {/* Status Section */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Icon icon="checkCircle" />
            <HeaderText variant="h3">Location</HeaderText>
          </XStack>

          <Separator borderColor="$mono300" />

          <XStack gap="$2">
            <Pill
              text={"Only show locations with shifts scheduled"}
              selected={onlyShowLocWithShifts}
              onPress={() => {
                setOnlyShowLocWithShifts(!onlyShowLocWithShifts)
              }}
            />
          </XStack>
        </YStack>
      </YStack>
    </BaseFilterBottomSheet>
  )
}

export { TeamRosterFilterBottomSheet }

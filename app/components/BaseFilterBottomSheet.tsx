import { ReactNode } from "react"
import { Pressable } from "react-native"
import { Sheet, XStack } from "tamagui"

import { BodyText } from "./BodyText"
import { HeaderText } from "./HeaderText"

interface BaseFilterBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  size: number
  handleClear: () => void
  handleApply: () => void
  children?: ReactNode
}

const BaseFilterBottomSheet = ({
  open,
  onOpenChange,
  size,
  handleClear,
  handleApply,
  children,
}: BaseFilterBottomSheetProps) => {
  return (
    <Sheet modal open={open} onOpenChange={onOpenChange} snapPoints={[size]} dismissOnSnapToBottom>
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

        {children}
      </Sheet.Frame>
    </Sheet>
  )
}

export { BaseFilterBottomSheet }

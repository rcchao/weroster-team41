import { FC } from "react"
import { Button } from "tamagui"

import { HeaderText } from "@/components/HeaderText"
import { Screen } from "@/components/Screen"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { $styles } from "@/theme/styles"

interface SwapShiftScreenProps extends AppStackScreenProps<"SwapShift"> {}

export const SwapShiftScreen: FC<SwapShiftScreenProps> = ({ navigation, route }) => {
  const { shiftId } = route.params

  const onClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <Screen contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <HeaderText variant="h3">ShiftID: {shiftId}</HeaderText>
      <Button
        onPress={onClose}
        backgroundColor="$mono200"
        borderRadius="$radius.6"
        height={36}
        px="$3"
      >
        Close
      </Button>
    </Screen>
  )
}

import { FC, ReactElement } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { YStack } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { Button } from "@/components/Button"
import { DashboardHomeHeader } from "@/components/DashboardHomeHeader"
import { DashboardCard } from "@/components/DashboardCard"
import { HeaderText } from "@/components/HeaderText"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { SubmitButton } from "@/components/SubmitButton"
import { useAuthenticatedUserId } from "@/context/AuthContext"
import { TxKeyPath } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useProfile } from "@/services/hooks/useProfile"
import { usePostSwapRequest } from "@/services/hooks/useUserRequests"
import { useAppTheme } from "@/theme/context"
import { $headerContainer, $styles } from "@/theme/styles"
import { $container, $fabButton } from "@/theme/styles"
import type { Theme } from "@/theme/types"

export interface Dashboard {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}

export const DashboardHomeScreen: FC<DashboardTabScreenProps<"DashboardHome">> =
  function DashboardHomeScreen(_props) {
    const { navigation } = _props
    const { themed } = useAppTheme()
    const userId = useAuthenticatedUserId()
    const { profile } = useProfile(userId)
    const mutation = usePostSwapRequest()

    const postSwapShiftRequest = async () => {
      const swapRequest = {
        message: "I think I'll be sick that day soz", // Including a message is optional
        event_id: 1,
        to_user: 18,
      }
      try {
        const data = await mutation.mutateAsync(swapRequest)
        if (data.success) {
          console.log("Posted successfully", data)
        } else {
          console.log("Post failed", data.error)
        }
      } catch (error) {
        console.error("Error posting:", error)
      }
    }

    return (
      <View style={$container}>
        <SafeAreaView style={$headerContainer} edges={["top"]}>
          <DashboardHomeHeader userName={profile?.first_name ?? "User"} navigation={navigation} />
        </SafeAreaView>
        <Screen preset="scroll" contentContainerStyle={$styles.container}>
          <HeaderText variant="h1">Home H1 Text</HeaderText>
          <HeaderText variant="h2">H2 Text</HeaderText>
          <HeaderText variant="h3">H3 Text</HeaderText>
          <BodyText variant="body">Body Text</BodyText>
          <BodyText variant="body2">Body2 Text</BodyText>
          <BodyText variant="body3">Body3 Text</BodyText>
          <BodyText variant="body4">Body4 Text</BodyText>
          <YStack gap={20}>
            <DashboardCard
              type="leave"
              date={new Date()}
              leaveDuration="Half-day"
              leaveType="Annual Leave"
              leaveStatus="approved"
            />
            <DashboardCard
              type="team"
              date={new Date()}
              teamCampus="TSC Campus"
              teamLocation="Theatre 1"
              teamOnCall={4}
              teamInPerson={3}
            />
            <DashboardCard
              type="allocatedShift"
              date={new Date()}
              shiftTimeRange="13:00 - 18:00"
              shiftLocation="PMCC"
              shiftDesignation="Anaes Coordinator"
              shiftNumUsers={3}
            />
            <DashboardCard
              type="openShift"
              date={new Date()}
              shiftTimeRange="8:00 - 12:00"
              shiftLocation="PMCC"
              shiftDesignation="Neurosurgery"
              openShiftExtraPay={500}
            />
          </YStack>
          <SubmitButton text="apply to swap shift" onPress={postSwapShiftRequest} />
        </Screen>

        {/* FAB positioned relative to the outer View */}
        <Button
          style={themed($fabButton)}
          // navigates to blank edit screen for now
          onPress={() => navigation.getParent()?.navigate("EditDashboard")}
        >
          <Icon icon="edit" size={18} color="black" />
        </Button>
      </View>
    )
  }

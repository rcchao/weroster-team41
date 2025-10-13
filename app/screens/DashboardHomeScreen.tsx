/* eslint-disable react-hooks/rules-of-hooks */
import { FC, ReactElement } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { YStack } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { Button } from "@/components/Button"
import { AllocatedShiftDashboardCard } from "@/components/DashboardCards/AllocatedShiftDashboardCard"
import { LeaveRequestDashboardCard } from "@/components/DashboardCards/LeaveRequestDashboardCard"
import { OpenShiftDashboardCard } from "@/components/DashboardCards/OpenShiftDashboardCard"
import { TeamDashboardCard } from "@/components/DashboardCards/TeamDashboardCard"
import { DashboardHomeHeader } from "@/components/DashboardHomeHeader"
import { DashboardRow } from "@/components/DashboardRow"
import { DashboardTeamMemberCard } from "@/components/DashboardTeamMemberCard"
import { HeaderText } from "@/components/HeaderText"
import { Icon } from "@/components/Icon"
import { LozengeType } from "@/components/Lozenge"
import { Screen } from "@/components/Screen"
import { Session } from "@/components/ShiftDetailsSubheader"
import { SubmitButton } from "@/components/SubmitButton"
import { useAuthenticatedUserId } from "@/context/AuthContext"
import { TxKeyPath } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useMyShifts } from "@/services/hooks/useMyShifts"
import { useOpenShifts } from "@/services/hooks/useOpenShifts"
import { useProfile } from "@/services/hooks/useProfile"
import { useUpcomingCampusEvents } from "@/services/hooks/useUpcomingCampusEvents"
import { useLeaveRequests, usePostSwapRequest } from "@/services/hooks/useUserRequests"
import { useAppTheme } from "@/theme/context"
import { $headerContainer } from "@/theme/styles"
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

    const { myShifts } = useMyShifts()
    const { openShifts } = useOpenShifts()
    const { upcomingCampusEvents } = useUpcomingCampusEvents()
    const { leaveRequests } = useLeaveRequests()

    return (
      <View style={$container}>
        <SafeAreaView style={$headerContainer} edges={["top"]}>
          <DashboardHomeHeader userName={profile?.first_name ?? "User"} navigation={navigation} />
        </SafeAreaView>
        <Screen preset="scroll">
          <YStack gap={20} marginBlockStart={30}>
            <DashboardRow
              title="Who's on duty"
              onPressViewAll={() => navigation.navigate("DashboardTeams")}
              cards={[
                <DashboardTeamMemberCard
                  key="1"
                  firstName="John"
                  lastName="Doe"
                  location="Theatre 1"
                  campus="General Campus"
                  shiftStartTime={new Date()}
                  shiftEndTime={new Date()}
                />,
                <DashboardTeamMemberCard
                  key="2"
                  firstName="Jane"
                  lastName="Smith"
                  location="Theatre 2"
                  campus="General Campus"
                  shiftStartTime={new Date()}
                  shiftEndTime={new Date()}
                />,
              ]}
            />
          </YStack>
          <HeaderText variant="h1">Home H1 Text</HeaderText>
          <HeaderText variant="h2">H2 Text</HeaderText>
          <HeaderText variant="h3">H3 Text</HeaderText>
          <BodyText variant="body">Body Text</BodyText>
          <BodyText variant="body2">Body2 Text</BodyText>
          <BodyText variant="body3">Body3 Text</BodyText>
          <BodyText variant="body4">Body4 Text</BodyText>
          <YStack gap={20}>
            {myShifts && (
              <AllocatedShiftDashboardCard
                startDate={myShifts[0].start_time}
                endDate={myShifts[0].end_time}
                campus={myShifts[0].campus}
                activity={myShifts[0].activity}
                numUsers={myShifts[0].numUsers}
                session={myShifts[0].eventSessions[0] as Session}
              />
            )}
            {openShifts && (
              <OpenShiftDashboardCard
                startDate={openShifts[0].start_time}
                endDate={openShifts[0].end_time}
                campus={openShifts[0].campus}
                activity={openShifts[0].activity}
                extraPay={openShifts[0].pay}
                openShiftStatus={openShifts[0].status as LozengeType}
              />
            )}
            {upcomingCampusEvents && (
              <TeamDashboardCard
                campusName={upcomingCampusEvents[0].campus_name}
                startDate={upcomingCampusEvents[0].start_date}
                locationName={upcomingCampusEvents[0].location_name}
                numAssignments={upcomingCampusEvents[0].num_assignments}
              />
            )}
            {leaveRequests && (
              <LeaveRequestDashboardCard
                startDate={leaveRequests[0].start_date}
                endDate={leaveRequests[0].end_date}
                leaveType={leaveRequests[0].leaveType}
                leaveStatus={leaveRequests[0].status as LozengeType}
              />
            )}
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

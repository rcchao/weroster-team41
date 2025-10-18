/* eslint-disable react-hooks/rules-of-hooks */
import { FC, ReactElement } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { YStack } from "tamagui"

import { Button } from "@/components/Button"
import { AllocatedShiftDashboardCard } from "@/components/DashboardCards/AllocatedShiftDashboardCard"
import { LeaveRequestDashboardCard } from "@/components/DashboardCards/LeaveRequestDashboardCard"
import { OpenShiftDashboardCard } from "@/components/DashboardCards/OpenShiftDashboardCard"
import { TeamDashboardCard } from "@/components/DashboardCards/TeamDashboardCard"
import { TeamMemberDashboardCard } from "@/components/DashboardCards/TeamMemberDashboardCard"
import { DashboardHomeHeader } from "@/components/DashboardHomeHeader"
import { DashboardRow } from "@/components/DashboardRow"
import { Icon } from "@/components/Icon"
import { LozengeType } from "@/components/Lozenge"
import { Screen } from "@/components/Screen"
import { Session } from "@/components/ShiftDetailsSubheader"
import { useAuthenticatedUserId } from "@/context/AuthContext"
import { TxKeyPath } from "@/i18n"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useDashboardPreferences } from "@/services/hooks/useDashboardPreferences"
import { useMyShifts } from "@/services/hooks/useMyShifts"
import { useOpenShifts } from "@/services/hooks/useOpenShifts"
import { useProfile } from "@/services/hooks/useProfile"
import { useTeamMemberData } from "@/services/hooks/useTeamMemberData"
import { useUpcomingCampusEvents } from "@/services/hooks/useUpcomingCampusEvents"
import { useLeaveRequests } from "@/services/hooks/useUserRequests"
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
    const { dashboardPreferences } = useDashboardPreferences()
    const { teamMemberData } = useTeamMemberData()
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
          <YStack gap={10} marginBlockStart={30}>
            {dashboardPreferences?.whos_on_duty && (
              <DashboardRow
                title="Who's on duty"
                onPressViewAll={() => navigation.navigate("DashboardTeams")}
                cards={
                  teamMemberData
                    ?.slice(0, 5)
                    .map((member, index) => (
                      <TeamMemberDashboardCard
                        key={index}
                        firstName={member.first_name}
                        lastName={member.last_name}
                        location={member.location_name}
                        shiftStartTime={member.start_time}
                        shiftEndTime={member.end_time}
                        campus={member.campus_name}
                      />
                    )) || []
                }
              />
            )}
            {dashboardPreferences?.upcoming_shifts && (
              <DashboardRow
                title="My Shifts"
                onPressViewAll={() =>
                  navigation.navigate("DashboardRoster", { screen: "MyRoster" })
                }
                cards={
                  myShifts
                    ?.slice(0, 5)
                    .map((shift, index) => (
                      <AllocatedShiftDashboardCard
                        key={index}
                        startDate={shift.start_time}
                        endDate={shift.end_time}
                        campus={shift.campus}
                        activity={shift.activity}
                        numUsers={shift.numUsers}
                        session={shift.eventSessions?.[0] as Session}
                      />
                    )) || []
                }
              />
            )}
            {dashboardPreferences?.upcoming_leaves && (
              <DashboardRow
                title="My Leave Requests"
                onPressViewAll={() => navigation.navigate("DashboardRequests")}
                cards={
                  leaveRequests
                    ?.slice(0, 5)
                    .map((leaveRequests, index) => (
                      <LeaveRequestDashboardCard
                        key={index}
                        startDate={leaveRequests.start_date}
                        endDate={leaveRequests.end_date}
                        leaveType={leaveRequests.leaveType}
                        leaveStatus={leaveRequests.status as LozengeType}
                      />
                    )) || []
                }
              />
            )}
            {dashboardPreferences?.open_shifts && (
              <DashboardRow
                title="Open Shifts"
                onPressViewAll={() =>
                  navigation.navigate("DashboardRoster", { screen: "OpenShifts" })
                }
                cards={
                  openShifts
                    ?.slice(0, 5)
                    .map((openShifts, index) => (
                      <OpenShiftDashboardCard
                        key={index}
                        startDate={openShifts.start_time}
                        endDate={openShifts.end_time}
                        campus={openShifts.campus}
                        activity={openShifts.activity}
                        extraPay={openShifts.pay}
                        openShiftStatus={openShifts.status as LozengeType}
                      />
                    )) || []
                }
              />
            )}
            {dashboardPreferences?.team_roster && (
              <DashboardRow
                title="My Teams"
                onPressViewAll={() =>
                  navigation.navigate("DashboardRoster", { screen: "TeamRoster" })
                }
                cards={
                  upcomingCampusEvents
                    ?.slice(0, 5)
                    .map((upcomingCampusEvents, index) => (
                      <TeamDashboardCard
                        key={index}
                        campusName={upcomingCampusEvents.campus_name}
                        startDate={upcomingCampusEvents.start_date}
                        locationName={upcomingCampusEvents.location_name}
                        numAssignments={upcomingCampusEvents.num_assignments}
                      />
                    )) || []
                }
              />
            )}
          </YStack>
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

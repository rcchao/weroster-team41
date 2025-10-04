import { FC, useState } from "react"
import { XStack, YStack } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { DateSelectorBar } from "@/components/DateSelectorBar"
import { Header } from "@/components/Header"
import { RequestCard, RequestType } from "@/components/RequestCard"
import { Screen } from "@/components/Screen"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useUserRequests } from "@/services/hooks/useUserRequests"
import { $styles } from "@/theme/styles"

export const DashboardRequestsScreen: FC<DashboardTabScreenProps<"DashboardRequests">> = (
  _props,
) => {
  // Harcoded values for demonstration
  const month = 1
  const year = 2025
  const { userRequests } = useUserRequests(month, year)
  const [date, setDate] = useState(new Date())

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <Header title="My Requests" />
      <DateSelectorBar mode="month" selectedDate={date} setSelectedDate={setDate} />
      <YStack gap="$4" paddingVertical="$4">
        {userRequests && userRequests.length > 0 ? (
          userRequests.map((request) => (
            <XStack key={request.id} justifyContent="center">
              <RequestCard
                requestType={request.type as RequestType}
                startDate={request.start_date}
                endDate={request.end_date}
                leaveType={"leaveType" in request ? request.leaveType : undefined}
                status={request.status}
              />
            </XStack>
          ))
        ) : (
          <BodyText variant="body4">Loading...</BodyText>
        )}
      </YStack>
    </Screen>
  )
}

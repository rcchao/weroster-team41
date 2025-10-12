import { FC, useState } from "react"
import { XStack, YStack, Spinner } from "tamagui"

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
  const [date, setDate] = useState(new Date())
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const { userRequests, isPending } = useUserRequests(month, year)

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.barContainer} safeAreaEdges={["top"]}>
      <Header title="My Requests" />
      <DateSelectorBar mode="month" selectedDate={date} setSelectedDate={setDate} />
      <YStack gap="$4" paddingVertical="$4">
        {isPending ? (
          <YStack paddingTop="60%" gap="$3" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <BodyText variant="body2">Loading...</BodyText>
          </YStack>
        ) : userRequests && userRequests.length > 0 ? (
          userRequests.map((request, idx) => (
            <XStack key={idx} justifyContent="center">
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
          <BodyText variant="body4">No requests found</BodyText>
        )}
      </YStack>
    </Screen>
  )
}

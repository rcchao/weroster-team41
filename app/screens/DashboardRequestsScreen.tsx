import { FC, useState } from "react"
import { XStack, YStack, Spinner } from "tamagui"

import { BodyText } from "@/components/BodyText"
import { DateSelectorBar } from "@/components/DateSelectorBar"
import { Header } from "@/components/Header"
import { RequestCard, RequestType, RequestStatus } from "@/components/RequestCard"
import { RequestFilterBottomSheet } from "@/components/RequestFilterBottomSheet"
import { Screen } from "@/components/Screen"
import { DashboardTabScreenProps } from "@/navigators/DashboardNavigator"
import { useUserRequests } from "@/services/hooks/useUserRequests"

export const DashboardRequestsScreen: FC<DashboardTabScreenProps<"DashboardRequests">> = (
  _props,
) => {
  const [date, setDate] = useState(new Date())
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<RequestType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<RequestStatus[]>([])

  const { userRequests, isPending } = useUserRequests(month, year, selectedTypes, selectedStatuses)

  return (
    <Screen preset="scroll">
      <YStack flex={1}>
        <Header title="My Requests" />
        <DateSelectorBar
          mode="month"
          selectedDate={date}
          setSelectedDate={setDate}
          setFilterSheetOpen={setFilterSheetOpen}
        />
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
        <RequestFilterBottomSheet
          open={filterSheetOpen}
          onOpenChange={setFilterSheetOpen}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />
      </YStack>
    </Screen>
  )
}

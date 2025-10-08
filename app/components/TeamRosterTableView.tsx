import { ScrollView, Separator, XStack, YStack } from "tamagui"

import { TeamShift } from "backend/src/types/event.types"

import { AccordionDropdown } from "./AccordionDropdown"
import { BodyText } from "./BodyText"
import { Icon } from "./Icon"

interface TeamRosterTableViewProps {
  campusShifts: TeamShift[]
}

const TeamRosterTableView = ({ campusShifts }: TeamRosterTableViewProps) => {
  const borderWidth = 1
  const borderColor = "$mono200"

  // Transform campuses into accordion sections
  const accordionSections = campusShifts.map((campus) => ({
    sectionText: campus.name,
    isCurrent: false,
    children: (
      <>
        {campus.locations.map((location, index) => (
          <YStack key={location.id}>
            {index > 0 && <Separator borderColor={borderColor} />}

            <XStack>
              {/* Location Column */}
              <YStack
                width={120}
                padding="$3"
                backgroundColor="$white100"
                justifyContent="center"
                borderRightWidth={borderWidth}
                borderRightColor={borderColor}
              >
                <BodyText variant="body2" fontWeight="800" textAlign="center">
                  {location.name}
                </BodyText>
              </YStack>

              {/* Events Column */}
              <YStack flex={1} padding="$3" justifyContent="center" backgroundColor="$white100">
                {location.events.length === 0 ? (
                  <BodyText variant="body4" color="$mono500">
                    No shifts scheduled
                  </BodyText>
                ) : (
                  <>
                    {location.events.map((event) => (
                      <YStack key={event.id} gap="$1.5">
                        {/* Activity Header */}
                        <XStack gap="$2" alignItems="center" marginBottom="$1.5">
                          <Icon icon="stethoscope" size={16} />
                          <BodyText variant="body2" fontWeight="800">
                            {event.activity || "Unassigned"}
                            {event.on_call && " [OC]"}
                          </BodyText>
                        </XStack>

                        {/* Assigned Users */}
                        {event.eventAssignments.map((assignment) => (
                          <XStack key={assignment.id} gap="$2" alignItems="center">
                            <Icon icon="user2" size={16} />
                            <BodyText variant="body3">
                              {assignment.first_name} {assignment.last_name}
                            </BodyText>
                          </XStack>
                        ))}
                      </YStack>
                    ))}
                  </>
                )}
              </YStack>
            </XStack>
          </YStack>
        ))}
      </>
    ),
  }))

  return (
    <ScrollView flex={1}>
      <AccordionDropdown sections={accordionSections} />
    </ScrollView>
  )
}

export { TeamRosterTableView }

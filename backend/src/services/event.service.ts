import { Prisma, PrismaClient, Session } from "@prisma/client"
import {
  ShiftDetails,
  ShiftWithNumUsers,
  OpenShift,
  CampusWithLocationsAndEvents,
  TeamShift,
  EventAssignmentUpdatePayload,
  EventAssignmentUpdateResponse,
} from "../types/event.types"

// Common select clause used across all shift queries
export const shiftSelect = {
  id: true,
  start_time: true,
  end_time: true,
  on_call: true,
  activity: true,
  pay: true,
  location: {
    select: {
      id: true,
      name: true,
      campus: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  },
  eventAssignments: {
    select: {
      id: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      designation: true,
    },
  },
  eventSessions: {
    select: {
      session: true,
    },
  },
}

export function annotateWithNumUsers(shift: ShiftDetails): ShiftWithNumUsers {
  return {
    id: shift.id,
    start_time: shift.start_time,
    end_time: shift.end_time,
    on_call: shift.on_call,
    activity_id: shift.activity?.id ?? null,
    activity: shift.activity?.name ?? null,
    location_id: shift.location.id,
    location: shift.location.name,
    campus_id: shift.location.campus.id,
    campus: shift.location.campus.name,
    campus_address: shift.location.campus.address,
    pay: shift.pay,
    eventAssignments: shift.eventAssignments.map((assignment) => ({
      user: {
        id: assignment.user.id,
        first_name: assignment.user.first_name,
        last_name: assignment.user.last_name ?? null,
      },
      designation: assignment.designation?.title ?? null,
    })),
    eventSessions: shift.eventSessions.map((es) => es.session),
    numUsers: shift.eventAssignments.length,
  }
}

export class EventService {
  // Use prisma client for DB operations/interactions -> Prisma is how we interact with the DB
  constructor(private prisma: PrismaClient) {}

  private async annotateWithStatus(
    shifts: ShiftWithNumUsers[],
    userId: number,
  ): Promise<OpenShift[]> {
    // Fetch all requests made by this user
    const requests = await this.prisma.assignmentRequest.findMany({
      where: { user_id: userId },
      select: { event_id: true },
    })

    const requestedEventIds = new Set(requests.map((r) => r.event_id))
    const now = new Date()
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

    // Enforcing status must be one of the following 3 statuses
    let status: "URGENT" | "REQUESTED" | "AVAILABLE"

    return shifts.map((shift) => {
      if (requestedEventIds.has(shift.id)) {
        status = "REQUESTED"
      } else if (shift.start_time < threeDaysFromNow) {
        status = "URGENT"
      } else {
        status = "AVAILABLE"
      }

      return { ...shift, status }
    })
  }

  private transformTeamShifts(campuses: CampusWithLocationsAndEvents[]): TeamShift[] {
    return campuses.map((campus) => ({
      ...campus,
      locations: campus.locations.map((location) => ({
        ...location,
        events: location.events.map((event) => ({
          id: event.id,
          start_time: event.start_time,
          end_time: event.end_time,
          on_call: event.on_call,
          activity: event.activity?.name ?? null,
          eventAssignments: event.eventAssignments.map((assignment) => ({
            id: assignment.user.id,
            first_name: assignment.user.first_name,
            last_name: assignment.user.last_name,
          })),
        })),
      })),
    }))
  }

  async getMyShifts(user_id: number): Promise<ShiftWithNumUsers[]> {
    const shifts = await this.prisma.event.findMany({
      where: {
        eventAssignments: {
          // Find all events where there exists at least one event assignment for the user
          some: {
            user_id: user_id,
          },
        },
      },
      select: shiftSelect,
      orderBy: {
        start_time: "asc",
      },
    })

    return shifts.map(annotateWithNumUsers)
  }

  async getOpenShifts(user_id: number, hospitalId: number): Promise<OpenShift[]> {
    const shifts = await this.prisma.event.findMany({
      where: {
        location: {
          campus: {
            hospital_id: hospitalId,
          },
        },
        eventAssignments: {
          // Find all events where there are no event assignments
          none: {},
        },
      },
      select: shiftSelect,
      orderBy: {
        start_time: "asc",
      },
    })

    const withNumUsers = shifts.map(annotateWithNumUsers)
    return await this.annotateWithStatus(withNumUsers, user_id)
  }

  async getShift(shiftId: number): Promise<ShiftWithNumUsers | null> {
    const shift = await this.prisma.event.findUnique({
      where: { id: shiftId },
      select: shiftSelect,
    })

    if (!shift) {
      return null
    }

    return annotateWithNumUsers(shift)
  }

  async getTeamShifts(
    hospitalId: number,
    day: number,
    month: number,
    year: number,
    session: Session,
  ): Promise<TeamShift[]> {
    // Get start and end datetime of the day
    const startDate = new Date(year, month, day, 0)
    const endDate = new Date(year, month, day, 23, 59, 59, 999)

    // Build the where clause for events
    // (1) Starts or ends within the month specified
    // (2) Has the specified session (AM/PM/AH)
    const eventsForDayAndSession: Prisma.EventWhereInput = {
      AND: [
        {
          OR: [
            {
              start_time: { gte: startDate, lte: endDate },
            },
            {
              end_time: { gte: startDate, lte: endDate },
            },
          ],
        },
        {
          eventSessions: {
            some: { session },
          },
        },
      ],
    }

    const campuses: CampusWithLocationsAndEvents[] = await this.prisma.campus.findMany({
      where: {
        hospital_id: hospitalId,
      },
      select: {
        id: true,
        name: true,
        locations: {
          select: {
            id: true,
            name: true,
            events: {
              where: eventsForDayAndSession,
              select: {
                id: true,
                start_time: true,
                end_time: true,
                on_call: true,
                activity: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                eventAssignments: {
                  select: {
                    user: {
                      select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                start_time: "asc",
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return this.transformTeamShifts(campuses)
  }

  async updateEventAssignment(
    updateData: EventAssignmentUpdatePayload,
    tx?: Prisma.TransactionClient,
  ): Promise<EventAssignmentUpdateResponse> {
    // First, find the assignment to update
    const prismaClient = tx ?? this.prisma
    const existingAssignment = await prismaClient.eventAssignment.findFirst({
      where: {
        event_id: updateData.event_id,
        user_id: updateData.from_user,
      },
    })

    if (!existingAssignment) {
      throw new Error("Event assignment not found for the specified user")
    }

    // Update the assignment to the new user
    const updatedEventAssignment = await this.prisma.eventAssignment.update({
      where: {
        id: existingAssignment.id,
      },
      data: {
        user_id: updateData.to_user,
      },
    })

    return updatedEventAssignment
  }
}

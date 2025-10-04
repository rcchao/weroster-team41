import { PrismaClient } from "@prisma/client"
import type { Event, Prisma, Session } from ".prisma/client"
import { ShiftDetails, ShiftWithNumUsers, CampusWithLocationsAndEvents } from "../types/event.types"

export class EventService {
  // Use prisma client for DB operations/interactions -> Prisma is how we interact with the DB
  constructor(private prisma: PrismaClient) {}

  // Async as it involves DB operations
  // Create a new event given the payload of type CreateEventDTO
  async create(data: Event) {
    // Validation logic
    if (data.start_time && data.end_time && data.start_time >= data.end_time) {
      throw new Error("Invalid time range")
    }

    return this.prisma.event.create({
      data,
      include: { activity: true },
    })
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
      select: {
        id: true,
        start_time: true,
        end_time: true,
        on_call: true,
        activity: true,
        location: true,
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
      },
      orderBy: {
        start_time: "asc",
      },
    })

    return shifts.map((shift: ShiftDetails) => ({
      ...shift,
      numUsers: shift.eventAssignments.length,
    }))
  }

  async getShift(shiftId: number): Promise<ShiftWithNumUsers | null> {
    const shift = await this.prisma.event.findUnique({
      where: { id: shiftId },
      select: {
        id: true,
        start_time: true,
        end_time: true,
        on_call: true,
        activity: true,
        location: true,
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
      },
    })

    if (!shift) {
      return null
    }

    return {
      ...shift,
      numUsers: shift.eventAssignments.length,
    }
  }

  async getTeamShifts(
    hospitalId: number,
    month: number,
    year: number,
    session: Session,
  ): Promise<CampusWithLocationsAndEvents[]> {
    // Get start and end date of the month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59, 999)

    // Build the where clause for events
    // (1) Starts or ends within the month specified
    // (2) Has the specified session (AM/PM/AH)
    const eventWhereClause: Prisma.EventWhereInput = {
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
              where: eventWhereClause,
              select: {
                id: true,
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

    return campuses
  }
}

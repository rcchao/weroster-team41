import { PrismaClient } from "@prisma/client"
import type { Event } from ".prisma/client"
import { ShiftDetails, ShiftWithNumUsers } from "../types/event.types"

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

  async getOpenShifts(hospitalId: number): Promise<ShiftDetails[]> {
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
}

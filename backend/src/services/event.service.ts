import { PrismaClient } from "@prisma/client"
import type { Event } from ".prisma/client"
import { ShiftDetails, ShiftWithNumUsers } from "../types/event.types"

export class EventService {
  // Use prisma client for DB operations/interactions -> Prisma is how we interact with the DB
  constructor(private prisma: PrismaClient) {}

  // Common select clause used across all shift queries
  private readonly shiftSelect = {
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
    eventSessions: {
      select: {
        session: true,
      },
    },
  } as const

  // Helper to add numUsers to a shift
  private annotateNumUsers(shift: ShiftDetails): ShiftWithNumUsers {
    return {
      ...shift,
      numUsers: shift.eventAssignments.length,
    }
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
      select: this.shiftSelect,
      orderBy: {
        start_time: "asc",
      },
    })

    return shifts.map(this.annotateNumUsers)
  }

  async getOpenShifts(hospitalId: number): Promise<ShiftWithNumUsers[]> {
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
      select: this.shiftSelect,
      orderBy: {
        start_time: "asc",
      },
    })

    return shifts.map(this.annotateNumUsers)
  }

  async getShift(shiftId: number): Promise<ShiftWithNumUsers | null> {
    const shift = await this.prisma.event.findUnique({
      where: { id: shiftId },
      select: this.shiftSelect,
    })

    if (!shift) {
      return null
    }

    return this.annotateNumUsers(shift)
  }
}

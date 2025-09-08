import { PrismaClient } from "@prisma/client"
import type { Event } from ".prisma/client"

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
      include: { Activity: true },
    })
  }

  // Retrieve events for a specific activity ID (refer to schema.prisma or diagram for relation)
  async getActivityEvents(activity_id: string) {
    // FInd many as one activity can have multiple events
    return this.prisma.event.findMany({
      where: {
        // activity_id,
      },
      include: { Activity: true },
    })
  }
}

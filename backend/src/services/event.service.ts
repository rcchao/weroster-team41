import { PrismaClient } from "@prisma/client"

import { CreateEventDTO } from "../types/event.types"

export class EventService {
  // Use prisma client for DB operations/interactions -> Prisma is how we interact with the DB
  constructor(private prisma: PrismaClient) {}

  // Async as it involves DB operations
  // Create a new event given the payload of type CreateEventDTO
  async create(data: CreateEventDTO) {
    // Validation logic
    if (data.startTime >= data.endTime) {
      throw new Error("Invalid time range")
    }

    return this.prisma.event.create({
      data,
      include: { activity: true },
    })
  }

  // Retrieve events for a specific activity ID (refer to schema.prisma or diagram for relation)
  async getActivityEvents(activityId: string) {
    // FInd many as one activity can have multiple events
    return this.prisma.event.findMany({
      where: {
        activityId,
      },
      include: { activity: true },
    })
  }
}

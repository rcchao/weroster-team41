import { Prisma } from ".prisma/client"

export type EventData = Prisma.EventGetPayload<{
  include: {
    activity: true
    location: true
    eventAssignments: {
      include: {
        user: {
          select: {
            id: true
            first_name: true
            last_name: true
          }
        }
        designation: true
      }
    }
  }
}>

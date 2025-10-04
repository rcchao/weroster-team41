import { Prisma } from ".prisma/client"

export type Campus = Prisma.CampusGetPayload<{
  select: {
    id: true
    name: true
    address: true
  }
}>

import { Prisma } from ".prisma/client"

export type Campus = Prisma.CampusGetPayload<{
  select: {
    id: true
    name: true
    address: true
  }
}>

export type UpcomingCampusEvent = {
  campus_name: string
  location_name: string
  start_date: Date
  num_assignments: number
}

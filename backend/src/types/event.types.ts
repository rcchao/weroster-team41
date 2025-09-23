import { Prisma } from ".prisma/client"

export type ShiftDetails = Prisma.EventGetPayload<{
  select: {
    id: true
    start_time: true
    end_time: true
    on_call: true
    activity: true
    location: true
    eventAssignments: {
      select: {
        id: true
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

export type ShiftWithNumUsers = ShiftDetails & {
  numUsers: number
}

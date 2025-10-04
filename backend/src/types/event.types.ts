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
    eventSessions: {
      select: {
        session: true
      }
    }
  }
}>

export type ShiftWithNumUsers = {
  id: number
  start_time: Date
  end_time: Date
  on_call: boolean
  activity: string | null
  location: string
  eventAssignments: Array<{
    user: {
      id: number
      first_name: string
      last_name: string | null
    }
    designation: string | null
  }>
  eventSessions: string[]
  numUsers: number
}

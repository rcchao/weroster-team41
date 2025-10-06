import { Prisma } from ".prisma/client"

export type ShiftDetails = Prisma.EventGetPayload<{
  select: {
    id: true
    start_time: true
    end_time: true
    on_call: true
    activity: true
    pay: true
    location: {
      select: {
        id: true
        name: true
        campus: {
          select: {
            id: true
            name: true
            address: true
          }
        }
      }
    }
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
  activity_id: number | null
  activity: string | null
  location_id: number
  location: string
  campus_id: number
  campus: string
  campus_address: string | null
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
  pay: number | null
}

export type OpenShift = ShiftWithNumUsers & {
  status: string
}

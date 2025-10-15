import { ShiftWithNumUsers } from "../types/event.types"
import { Prisma } from ".prisma/client"

export type SwapNotification = {
  id: number
  created_at: Date
  is_read: boolean
  requires_action: boolean
  to_user: number
  from_user: number
  swap: {
    id: number
    message: string | null
    status: string
    event: ShiftWithNumUsers
  }
  fromUser: {
    first_name: string
    last_name: string
  }
}

export type LeaveNotification = Prisma.LeaveNotificationGetPayload<{
  select: {
    id: true
    created_at: true
    is_read: true
    requires_action: true
    leave: {
      select: {
        id: true
        start_date: true
        end_date: true
        status: true
        leaveType: true
      }
    }
  }
}>

export type AssignmentRequestNotification = Prisma.AssignmentRequestNotificationGetPayload<{
  select: {
    id: true
    created_at: true
    is_read: true
    requires_action: true
    assignmentRequest: {
      select: {
        id: true
        status: true
        event: {
          select: {
            id: true
            start_time: true
            end_time: true
            location: {
              select: {
                name: true
              }
            }
            activity: {
              select: {
                name: true
              }
            }
          }
        }
      }
    }
  }
}>

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
    from_user: number
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

export type SwapNotificationPayload = {
  to_user: number
  swap_id: number
  requires_action?: boolean
}

export type SwapNotificationPostResponse = Prisma.SwapNotificationGetPayload<{
  select: {
    id: true
    created_at: true
    is_read: true
    requires_action: true
    to_user: true
    from_user: true
    swap_request: true
  }
}>

export type SwapNotificationUpdatePayload = {
  id: number
  is_read?: boolean
  requires_action?: boolean
}

export type SwapNotificationUpdatePostPayload = Prisma.SwapNotificationGetPayload<{
  select: {
    id: true
    created_at: true
    is_read: true
    requires_action: true
    to_user: true
    from_user: true
    swap_request: true
  }
}>

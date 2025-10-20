import { Prisma } from ".prisma/client"
import { SwapNotificationPostResponse } from "./notifications.types"

export type Leave = Prisma.LeaveGetPayload<{
  select: {
    id: true
    start_date: true
    end_date: true
    status: true
    leaveType: true
  }
}>

export type Assignment = Prisma.AssignmentRequestGetPayload<{
  select: {
    id: true
    status: true
    event: {
      select: {
        id: true
        start_time: true
        end_time: true
      }
    }
  }
}>

export type AssignmentPostResponse = Prisma.AssignmentRequestGetPayload<{
  select: {
    id: true
    status: true
    user_id: true
    event_id: true
  }
}>

export type AssignmentRequestPayload = {
  event_id: number
}

export type Swap = Prisma.SwapGetPayload<{
  select: {
    id: true
    message: true
    status: true
    from_user: true
    to_user: true
    event: {
      select: {
        id: true
        start_time: true
        end_time: true
      }
    }
  }
}>

export type SwapPostResponse = Prisma.SwapGetPayload<{
  select: {
    id: true
    message: true
    status: true
    from_user: true
    to_user: true
    event_id: true
  }
}>

export type SwapWithNotificationPostResponse = {
  swap: SwapPostResponse
  notification: SwapNotificationPostResponse
}

export type SwapRequestPayload = {
  to_user: number
  event_id: number
  message?: string
}

export type SwapUpdatePayload = Prisma.SwapGetPayload<{
  select: {
    id: true
    status: true
  }
}>

export type SwapUpdateResponsePayload = Prisma.SwapGetPayload<{
  select: {
    id: true
    message: true
    status: true
    from_user: true
    to_user: true
    event_id: true
  }
}>

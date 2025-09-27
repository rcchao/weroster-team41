import { Prisma } from ".prisma/client"

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

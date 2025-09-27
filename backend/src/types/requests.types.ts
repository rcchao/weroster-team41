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

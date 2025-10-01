import { PrismaClient } from "@prisma/client"
import { Leave, Assignment, Swap } from "../../../backend/src/types/requests.types"

export class RequestsService {
  constructor(private prisma: PrismaClient) {}

  async getLeaveRequests(user_id: number, month: number, year: number): Promise<Leave[]> {
    // Beginning (midnight) on the first day of the month
    const start = new Date(year, month - 1, 1)

    // End (23:59:59.999) of the last day of of the month
    const end = new Date(year, month, 0, 23, 59, 59, 999)

    // A request is considered to be part of the month if:
    // the start date is within the month OR
    // the end date is within the month
    const leaveRequests = await this.prisma.leave.findMany({
      where: {
        user_id: user_id,
        OR: [
          {
            start_date: {
              gte: start,
              lte: end,
            },
          },
          {
            end_date: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
      select: {
        id: true,
        start_date: true,
        end_date: true,
        status: true,
        leaveType: true,
      },
    })

    return leaveRequests
  }

  async getAssignmentRequests(user_id: number, month: number, year: number): Promise<Assignment[]> {
    // See month filtering logic for LeaveRequests
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59, 999)

    const assignmentRequests = await this.prisma.assignmentRequest.findMany({
      where: {
        user_id: user_id,
        OR: [
          {
            event: {
              start_time: {
                gte: start,
                lte: end,
              },
            },
          },
          {
            event: {
              end_time: {
                gte: start,
                lte: end,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        status: true,
        event: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
          },
        },
      },
    })

    return assignmentRequests
  }

  async getSwapRequest(user_id: number, month: number, year: number): Promise<Swap[]> {
    // See month filtering logic for LeaveRequests
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59, 999)

    const swapRequests = await this.prisma.swap.findMany({
      where: {
        from_user: user_id,
        OR: [
          {
            event: {
              start_time: {
                gte: start,
                lte: end,
              },
            },
          },
          {
            event: {
              end_time: {
                gte: start,
                lte: end,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        message: true,
        status: true,
        from_user: true,
        to_user: true,
        event: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
          },
        },
      },
    })

    return swapRequests
  }
}

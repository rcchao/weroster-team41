import { Prisma, PrismaClient } from "@prisma/client"
import {
  Leave,
  Assignment,
  AssignmentPostResponse,
  AssignmentRequestPayload,
  Swap,
  SwapRequestPayload,
  SwapPostResponse,
  SwapUpdatePayload,
  SwapUpdateResponsePayload,
} from "../../../backend/src/types/requests.types"

export class RequestsService {
  constructor(private prisma: PrismaClient) {}

  async getLeaveRequests(user_id: number, month?: number, year?: number): Promise<Leave[]> {
    // Build where clause based on optional params
    const leaveAtDate: Prisma.LeaveWhereInput = {
      user_id: user_id,
    }

    if (month !== undefined && year !== undefined) {
      // Beginning (midnight) on the first day of the month
      const start = new Date(year, month - 1, 1)

      // End (23:59:59.999) of the last day of the month
      const end = new Date(year, month, 0, 23, 59, 59, 999)

      // A request is considered to be part of the month if:
      // the start date is within the month OR
      // the end date is within the month
      leaveAtDate.OR = [
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
      ]
    } else {
      // If no month/year provided, get all leave requests after today
      const today = new Date()

      leaveAtDate.end_date = {
        gte: today,
      }
    }

    // Find all leave requests
    const leaveRequests = await this.prisma.leave.findMany({
      where: leaveAtDate,
      select: {
        id: true,
        start_date: true,
        end_date: true,
        status: true,
        leaveType: true,
      },
      orderBy: {
        start_date: "asc",
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

  async setAssignmentRequest(
    userId: number,
    assignmentRequest: AssignmentRequestPayload,
  ): Promise<AssignmentPostResponse> {
    const eventId = assignmentRequest.event_id
    const assignment = await this.prisma.assignmentRequest.create({
      data: {
        user_id: userId,
        event_id: eventId,
      },
    })
    return assignment
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

  async setSwapRequest(
    userId: number,
    assignmentRequest: SwapRequestPayload,
    tx?: Prisma.TransactionClient,
  ): Promise<SwapPostResponse> {
    const prismaClient = tx ?? this.prisma
    const eventId = assignmentRequest.event_id
    const toUser = assignmentRequest.to_user
    const message = assignmentRequest.message
    const assignment = await prismaClient.swap.create({
      data: {
        from_user: userId,
        to_user: toUser,
        event_id: eventId,
        message: message,
      },
    })
    return assignment
  }

  async updateSwapRequest(
    updateData: SwapUpdatePayload,
    tx?: Prisma.TransactionClient,
  ): Promise<SwapUpdateResponsePayload> {
    const prismaClient = tx ?? this.prisma
    const updatedSwap = await prismaClient.swap.update({
      where: { id: updateData.id },
      data: { status: updateData.status },
    })
    return updatedSwap
  }
}

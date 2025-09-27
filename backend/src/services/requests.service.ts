import { PrismaClient } from "@prisma/client"
import { Leave, Assignment, Swap } from "../../../backend/src/types/requests.types"

export class RequestsService {
  constructor(private prisma: PrismaClient) {}

  async getLeaveRequests(user_id: number): Promise<Leave[]> {
    const leaveRequests = await this.prisma.leave.findMany({
      where: { user_id: user_id },
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

  async getAssignmentRequests(user_id: number): Promise<Assignment[]> {
    const assignmentRequests = await this.prisma.assignmentRequest.findMany({
      where: { user_id: user_id },
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

  async getSwapRequest(user_id: number): Promise<Swap[]> {
    const assignmentRequests = await this.prisma.swap.findMany({
      where: { from_user: user_id },
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

    return assignmentRequests
  }
}

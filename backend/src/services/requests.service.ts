import { PrismaClient } from "@prisma/client"
import { Leave } from "../../../backend/src/types/requests.types"

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
}

import { PrismaClient } from "@prisma/client"
import {
  SwapNotification,
  LeaveNotification,
  AssignmentRequestNotification,
} from "../../../backend/src/types/notifications.types"
import { shiftSelect, annotateWithNumUsers } from "../services/event.service"

export class NotificationsService {
  constructor(private prisma: PrismaClient) {}

  async getSwapNotifications(userId: number): Promise<SwapNotification[]> {
    const swapNotification = await this.prisma.swapNotification.findMany({
      where: { to_user: userId },
      select: {
        id: true,
        created_at: true,
        is_read: true,
        requires_action: true,
        to_user: true,
        from_user: true,
        swap: {
          select: {
            id: true,
            message: true,
            status: true,
            event: {
              select: shiftSelect,
            },
          },
        },
        fromUser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    })

    if (!swapNotification) {
      throw new Error("swapNotification not found")
    }

    const annotated = swapNotification.map((swapnotif) => ({
      ...swapnotif,
      swap: {
        ...swapnotif.swap,
        event: annotateWithNumUsers(swapnotif.swap.event),
      },
    }))

    return annotated
  }

  async getLeaveNotifications(userId: number): Promise<LeaveNotification[]> {
    const leaveNotification = await this.prisma.leaveNotification.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        created_at: true,
        is_read: true,
        requires_action: true,
        leave: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
            status: true,
            leaveType: true,
          },
        },
      },
    })

    if (!leaveNotification) {
      throw new Error("leaveNotification not found")
    }

    return leaveNotification
  }

  async getAssignmentRequestNotification(userId: number): Promise<AssignmentRequestNotification[]> {
    const assignmentRequestNotification = await this.prisma.assignmentRequestNotification.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        created_at: true,
        is_read: true,
        requires_action: true,
        assignmentRequest: {
          select: {
            id: true,
            status: true,
            event: {
              select: {
                id: true,
                start_time: true,
                end_time: true,
                location: {
                  select: {
                    name: true,
                  },
                },
                activity: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!assignmentRequestNotification) {
      throw new Error("assignmentRequestNotification not found")
    }

    return assignmentRequestNotification
  }
}

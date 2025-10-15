import { PrismaClient } from "@prisma/client"
import { SwapNotification } from "../../../backend/src/types/notifications.types"
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
}

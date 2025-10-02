import { PrismaClient } from "@prisma/client"
import { TeamMemberData } from "../types/users.types"

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getTeamMemberData(userId: number, userHospitalId: number): Promise<TeamMemberData[]> {
    const now = new Date()

    const teamMemberData = await this.prisma.eventAssignment.findMany({
      distinct: ["user_id"],
      where: {
        user: {
          id: { not: userId },
          hospital_id: userHospitalId,
        },
        event: {
          end_time: { gt: now },
        },
      },
      orderBy: {
        event: {
          start_time: "asc",
        },
      },
      select: {
        id: true,
        user_id: true,
        designation_id: true,
        event_id: true,
        event: {
          select: {
            start_time: true,
            end_time: true,
            location: {
              select: {
                id: true,
                name: true,
                campus: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        designation: {
          select: {
            title: true,
          },
        },
      },
    })

    if (!teamMemberData) {
      throw new Error("teamMemberData not found")
    }

    return teamMemberData
  }
}

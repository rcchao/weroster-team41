import { PrismaClient } from "@prisma/client"
import { Campus } from "../types/campus.types"

export class CampusService {
  constructor(private prisma: PrismaClient) {}

  // Get campus by location ID
  async getCampus(locationId: number): Promise<Campus> {
    const location = await this.prisma.location.findUnique({
      where: { id: locationId },
      select: {
        campus: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    })

    if (!location) {
      throw new Error("Location not found")
    }

    return location.campus
  }
}

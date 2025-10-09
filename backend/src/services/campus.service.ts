import { PrismaClient } from "@prisma/client"
import { Campus, UpcomingCampusEvent } from "../types/campus.types"

export class CampusService {
  constructor(private prisma: PrismaClient) {}

  // Get upcoming shift for each campus
  async getUpcomingCampusEvents(user_id: number): Promise<UpcomingCampusEvent[]> {
    const today = new Date()

    const campuses = await this.prisma.campus.findMany({
      where: {
        locations: {
          some: {
            events: {
              some: {
                start_time: { gte: today },
                eventAssignments: { some: { user_id } },
              },
            },
          },
        },
      },
      select: {
        name: true,
        locations: {
          select: {
            name: true,
            events: {
              where: {
                start_time: { gte: today },
                eventAssignments: { some: { user_id } },
              },
              select: {
                start_time: true,
                eventAssignments: { select: { id: true } },
              },
              orderBy: { start_time: "asc" },
              take: 1,
            },
          },
        },
      },
    })

    // Since Campus -< Location -< Event need to flatMaps to map the many objects
    // then flatten, returns a list of the upcoming event for each campus
    return campuses.flatMap((campus) => {
      const events = campus.locations
        .filter((location) => location.events.length > 0) // Only locations with events, will only be max 1
        .map((location) => ({
          campus_name: campus.name,
          location_name: location.name,
          start_date: location.events[0].start_time, // Safe because we filtered
          num_assignments: location.events[0].eventAssignments.length,
        }))
        .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
        .slice(0, 1) // Keep only the earliest event for this campus

      return events
    })
  }

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

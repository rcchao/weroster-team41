import { PrismaClient } from "@prisma/client"
import { DashboardPreferences } from "../../../backend/src/types/settings.types"

export class SettingsService {
  constructor(private prisma: PrismaClient) {}

  async getDashboardPreferences(userId: number): Promise<DashboardPreferences> {
    const dashboardPreferences = await this.prisma.dashboardPreference.findUnique({
      where: { user_id: userId },
    })

    if (!dashboardPreferences) {
      throw new Error("dashboardPreferences not found")
    }

    return dashboardPreferences
  }

  async setDashboardPreferences(
    userId: number,
    preferences: DashboardPreferences,
  ): Promise<DashboardPreferences> {
    const dashboardPreferences = await this.prisma.dashboardPreference.upsert({
      where: { user_id: userId },
      update: preferences,
      create: { user_id: userId, ...preferences },
    })
    return dashboardPreferences
  }
}

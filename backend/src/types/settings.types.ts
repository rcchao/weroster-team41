import { Prisma } from ".prisma/client"

export type DashboardPreferences = Prisma.DashboardPreferenceGetPayload<{
  select: {
    whosOnDuty: true
    upcomingShifts: true
    upcomingLeaves: true
    openShifts: true
    teamRoster: true
  }
}>

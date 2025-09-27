import { Prisma } from ".prisma/client"

export type DashboardPreferences = Prisma.DashboardPreferenceGetPayload<{
  select: {
    whos_on_duty: true
    upcoming_shifts: true
    upcoming_leaves: true
    open_shifts: true
    team_roster: true
  }
}>

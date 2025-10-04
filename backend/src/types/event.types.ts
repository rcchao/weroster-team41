import { Prisma } from ".prisma/client"

export type ShiftDetails = Prisma.EventGetPayload<{
  select: {
    id: true
    start_time: true
    end_time: true
    on_call: true
    activity: true
    location: true
    eventAssignments: {
      select: {
        id: true
        user: {
          select: {
            id: true
            first_name: true
            last_name: true
          }
        }
        designation: true
      }
    }
  }
}>

export type ShiftWithNumUsers = ShiftDetails & {
  numUsers: number
}

export type CampusWithLocationsAndEvents = Prisma.CampusGetPayload<{
  select: {
    id: true
    name: true
    locations: {
      select: {
        id: true
        name: true
        events: {
          select: {
            id: true
            start_time: true
            end_time: true
            on_call: true
            activity: {
              select: {
                id: true
                name: true
                activityGroup: {
                  select: {
                    id: true
                    name: true
                  }
                }
              }
            }
            eventAssignments: {
              select: {
                id: true
                designation: {
                  select: {
                    id: true
                    title: true
                    description: true
                  }
                }
                user: {
                  select: {
                    id: true
                    first_name: true
                    last_name: true
                  }
                }
              }
            }
            eventSessions: {
              select: {
                id: true
                session: true
              }
            }
          }
        }
      }
    }
  }
}>

export type ShiftWithLocation = Prisma.EventGetPayload<{
  select: {
    id: true
    start_time: true
    end_time: true
    on_call: true
    activity: {
      select: {
        id: true
        name: true
      }
    }
    location: {
      select: {
        id: true
        name: true
        campus: {
          select: {
            id: true
            name: true
          }
        }
      }
    }
    eventAssignments: {
      select: {
        id: true
        user: {
          select: {
            id: true
            first_name: true
            last_name: true
          }
        }
      }
    }
  }
}>

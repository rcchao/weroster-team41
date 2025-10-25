import { Prisma } from ".prisma/client"

export type ShiftDetails = Prisma.EventGetPayload<{
  select: {
    id: true
    start_time: true
    end_time: true
    on_call: true
    activity: true
    pay: true
    location: {
      select: {
        id: true
        name: true
        campus: {
          select: {
            id: true
            name: true
            address: true
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
        designation: true
      }
    }
    eventSessions: {
      select: {
        session: true
      }
    }
  }
}>

export type ShiftWithNumUsers = {
  id: number
  start_time: Date
  end_time: Date
  on_call: boolean
  activity_id: number | null
  activity: string | null
  location_id: number
  location: string
  campus_id: number
  campus: string
  campus_address: string | null
  eventAssignments: Array<{
    user: {
      id: number
      first_name: string
      last_name: string | null
    }
    designation: string | null
  }>
  eventSessions: string[]
  numUsers: number
  pay: number | null
}

export type OpenShift = ShiftWithNumUsers & {
  status: string
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

export type TeamShift = {
  id: number
  name: string
  locations: Array<{
    id: number
    name: string
    events: Array<{
      id: number
      start_time: Date
      end_time: Date
      on_call: boolean
      activity: string | null
      eventAssignments: Array<{
        id: number
        first_name: string
        last_name: string
      }>
    }>
  }>
}

export type EventAssignmentUpdatePayload = {
  from_user: number
  to_user: number
  event_id: number
}

export type EventAssignmentUpdateResponse = Prisma.EventAssignmentGetPayload<{
  select: {
    id: true
    event_id: true
    user_id: true
  }
}>

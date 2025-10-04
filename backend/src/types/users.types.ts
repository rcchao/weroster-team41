import { Prisma } from ".prisma/client"

export type TeamMemberData = Prisma.EventAssignmentGetPayload<{
  select: {
    id: true
    user_id: true
    designation_id: true
    event_id: true
    event: {
      select: {
        start_time: true
        end_time: true
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
      }
    }
    user: {
      select: {
        first_name: true
        last_name: true
      }
    }
    designation: {
      select: {
        title: true
      }
    }
  }
}>

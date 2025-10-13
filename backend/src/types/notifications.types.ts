import { ShiftWithNumUsers } from "../types/event.types"

export type SwapNotification = {
  id: number
  created_at: Date
  is_read: boolean
  requires_action: boolean
  to_user: number
  from_user: number
  swap: {
    id: number
    message: string | null
    status: string
    event: ShiftWithNumUsers
  }
  fromUser: {
    first_name: string
    last_name: string
  }
}

import { SwapNotificationUpdatePayload, SwapNotificationPayload } from "./notifications.types"
import { SwapPostResponse } from "./requests.types"
import { EventAssignmentUpdateResponse } from "./event.types"
import { RequestStatus } from ".prisma/client"

export type SwapNotificationActionPayload = {
  swap_notif_id: number
  status: RequestStatus
}

export type SwapNotificationActionResponsePayload = {
  updated_notification: SwapNotificationUpdatePayload
  swap: SwapPostResponse
  send_notification: SwapNotificationPayload
  swapped_event_assignment?: EventAssignmentUpdateResponse
}

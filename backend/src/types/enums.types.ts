import { RequestStatus } from ".prisma/client"

export type RequestStatusType = (typeof RequestStatus)[keyof typeof RequestStatus]

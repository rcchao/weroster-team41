// Event specific types

// Define the type of the payload (Data Transfer Object) required to create a new event
export interface CreateEventDTO {
  title: string
  activityId: string
  location: string
  startTime: Date
  endTime: Date
}

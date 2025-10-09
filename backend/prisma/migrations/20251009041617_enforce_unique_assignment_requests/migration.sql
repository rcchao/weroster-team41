/*
  Warnings:

  - A unique constraint covering the columns `[user_id,event_id]` on the table `AssignmentRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AssignmentRequest_user_id_event_id_key` ON `AssignmentRequest`(`user_id`, `event_id`);

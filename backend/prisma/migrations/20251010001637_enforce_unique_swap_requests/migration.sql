/*
  Warnings:

  - A unique constraint covering the columns `[from_user,to_user,event_id]` on the table `Swap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Swap_from_user_to_user_event_id_key` ON `Swap`(`from_user`, `to_user`, `event_id`);

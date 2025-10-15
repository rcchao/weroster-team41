/*
  Warnings:

  - You are about to drop the column `required_action` on the `AssignmentRequestNotification` table. All the data in the column will be lost.
  - You are about to drop the column `required_action` on the `LeaveNotification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AssignmentRequestNotification` DROP COLUMN `required_action`,
    ADD COLUMN `requires_action` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `LeaveNotification` DROP COLUMN `required_action`,
    ADD COLUMN `requires_action` BOOLEAN NOT NULL DEFAULT false;

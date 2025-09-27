/*
  Warnings:

  - You are about to drop the column `session` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `leave_type_id` on the `Leave` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `leave_type_id` ON `Leave`;

-- AlterTable
ALTER TABLE `Leave` DROP COLUMN `leave_type_id`;

-- CreateTable
-- Step 1: Create the new EventSession junction table
CREATE TABLE `EventSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `session` ENUM('AM', 'PM', 'AH', 'OC') NOT NULL,
    PRIMARY KEY (`id`)
);

-- Step 2: Add unique constraint to prevent duplicate sessions
CREATE UNIQUE INDEX `EventSession_event_id_session_key` ON `EventSession`(`event_id`, `session`);

-- Step 3: Add index for event_id
CREATE INDEX `EventSession_event_id_idx` ON `EventSession`(`event_id`);

-- Step 4: Add foreign key constraint
ALTER TABLE `EventSession` ADD CONSTRAINT `EventSession_event_id_fkey` 
    FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 5: Add on_call column to Event table
ALTER TABLE `Event` ADD COLUMN `on_call` BOOLEAN NOT NULL DEFAULT false;

-- Step 6: Migrate existing session data to EventSession table
-- This preserves all existing sessions
INSERT INTO `EventSession` (`event_id`, `session`)
SELECT `id`, `session` FROM `Event` WHERE `session` IS NOT NULL;

-- Step 7: Set on_call to true for all OC events
UPDATE `Event` SET `on_call` = true WHERE `session` = 'OC';

-- Step 8: For OC events, add AM, PM, and AH sessions to EventSession
-- First, delete the OC entries we just inserted
DELETE FROM `EventSession` WHERE `session` = 'OC';

-- Then add AM, PM, AH for all on_call events
INSERT INTO `EventSession` (`event_id`, `session`)
SELECT `id`, 'AM' FROM `Event` WHERE `session` = 'OC'
UNION ALL
SELECT `id`, 'PM' FROM `Event` WHERE `session` = 'OC'
UNION ALL
SELECT `id`, 'AH' FROM `Event` WHERE `session` = 'OC';

-- Step 9: Now we can safely drop the session column from Event table
ALTER TABLE `Event` DROP COLUMN `session`;

-- Step 10: Update the Session enum in EventSession to remove OC
-- This requires recreating the column with the new enum
ALTER TABLE `EventSession` MODIFY COLUMN `session` ENUM('AM', 'PM', 'AH') NOT NULL;
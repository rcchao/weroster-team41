/*
  Warnings:

  - You are about to drop the column `openShifts` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `teamRoster` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `upcomingLeaves` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `upcomingShifts` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `whosOnDuty` on the `DashboardPreference` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SavedFilters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `DashboardPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `DashboardPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `SavedFilters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- Rename columns in DashboardPreference table (preserves all data)
ALTER TABLE `DashboardPreference` 
  CHANGE COLUMN `userId` `user_id` INTEGER NOT NULL,
  CHANGE COLUMN `whosOnDuty` `whos_on_duty` BOOLEAN NOT NULL DEFAULT true,
  CHANGE COLUMN `upcomingShifts` `upcoming_shifts` BOOLEAN NOT NULL DEFAULT true,
  CHANGE COLUMN `upcomingLeaves` `upcoming_leaves` BOOLEAN NOT NULL DEFAULT true,
  CHANGE COLUMN `openShifts` `open_shifts` BOOLEAN NOT NULL DEFAULT true,
  CHANGE COLUMN `teamRoster` `team_roster` BOOLEAN NOT NULL DEFAULT true;

-- Rename column in SavedFilters table (preserves all data)
ALTER TABLE `SavedFilters` 
  CHANGE COLUMN `userId` `user_id` INTEGER NOT NULL;

-- Drop old foreign key constraints
ALTER TABLE `DashboardPreference` DROP FOREIGN KEY `DashboardPreference_userId_fkey`;
ALTER TABLE `SavedFilters` DROP FOREIGN KEY `SavedFilters_userId_fkey`;

-- Drop old indexes
DROP INDEX `DashboardPreference_userId_key` ON `DashboardPreference`;
DROP INDEX `userId_idx` ON `SavedFilters`;

-- Create new indexes with updated column names
CREATE UNIQUE INDEX `DashboardPreference_user_id_key` ON `DashboardPreference`(`user_id`);
CREATE INDEX `user_id` ON `DashboardPreference`(`user_id`);
CREATE INDEX `user_id` ON `SavedFilters`(`user_id`);

-- Add foreign key constraints back with new column names
ALTER TABLE `DashboardPreference` ADD CONSTRAINT `DashboardPreference_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `SavedFilters` ADD CONSTRAINT `SavedFilters_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
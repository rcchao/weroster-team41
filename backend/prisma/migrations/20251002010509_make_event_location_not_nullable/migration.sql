/*
  Warnings:

  - Made the column `location_id` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_ibfk_2`;

-- AlterTable
ALTER TABLE `Event` MODIFY `location_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

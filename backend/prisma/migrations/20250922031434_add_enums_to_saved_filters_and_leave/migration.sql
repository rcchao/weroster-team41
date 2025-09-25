/*
  Warnings:

  - You are about to drop the `TeamRosterFilterPreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TeamRosterFilterPreference` DROP FOREIGN KEY `TeamRosterFilterPreference_userId_fkey`;

-- AlterTable
ALTER TABLE `Leave` ADD COLUMN `leaveType` ENUM('ANNUAL', 'COMPASSIONATE', 'PARENTAL', 'SICK', 'UNPAID') NULL DEFAULT 'ANNUAL';

-- DropTable
DROP TABLE `TeamRosterFilterPreference`;

-- CreateTable
CREATE TABLE `SavedFilters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `filterType` ENUM('EVENTS', 'USERS') NULL,
    `sessions` JSON NULL,
    `locations` JSON NULL,
    `designations` JSON NULL,

    INDEX `userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SavedFilters` ADD CONSTRAINT `SavedFilters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

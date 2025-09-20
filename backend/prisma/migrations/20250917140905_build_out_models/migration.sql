-- AlterTable
ALTER TABLE `Event` ADD COLUMN `session` ENUM('AM', 'PM', 'AH', 'OC') NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `preference` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `DashboardPreference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `whosOnDuty` BOOLEAN NOT NULL DEFAULT true,
    `upcomingShifts` BOOLEAN NOT NULL DEFAULT true,
    `upcomingLeaves` BOOLEAN NOT NULL DEFAULT true,
    `openShifts` BOOLEAN NOT NULL DEFAULT true,
    `teamRoster` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `DashboardPreference_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamRosterFilterPreference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `sessions` JSON NULL,
    `locations` JSON NULL,
    `designations` JSON NULL,

    INDEX `userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Swap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(255) NULL,
    `from_user` INTEGER NULL,
    `to_user` INTEGER NULL,
    `event_id` INTEGER NULL,
    `status` VARCHAR(255) NULL,

    INDEX `event_id`(`event_id`),
    INDEX `from_user`(`from_user`),
    INDEX `to_user`(`to_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DashboardPreference` ADD CONSTRAINT `DashboardPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamRosterFilterPreference` ADD CONSTRAINT `TeamRosterFilterPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

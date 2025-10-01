/*
  Warnings:

  - Made the column `user_id` on table `AssignmentRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_id` on table `AssignmentRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `AssignmentRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Designation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_time` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_time` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_id` on table `EventAssignment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `EventAssignment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Hospital` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `leaveType` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `campus_id` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `from_user` on table `Swap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to_user` on table `Swap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_id` on table `Swap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Swap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hospital_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `AssignmentRequest` DROP FOREIGN KEY `AssignmentRequest_ibfk_1`;

-- DropForeignKey
ALTER TABLE `AssignmentRequest` DROP FOREIGN KEY `AssignmentRequest_ibfk_2`;

-- DropForeignKey
ALTER TABLE `EventAssignment` DROP FOREIGN KEY `EventAssignment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `EventAssignment` DROP FOREIGN KEY `EventAssignment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Leave` DROP FOREIGN KEY `Leave_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Swap` DROP FOREIGN KEY `Swap_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Swap` DROP FOREIGN KEY `Swap_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Swap` DROP FOREIGN KEY `Swap_ibfk_3`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_ibfk_3`;

-- AlterTable
ALTER TABLE `AssignmentRequest` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `event_id` INTEGER NOT NULL,
    MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NOT NULL DEFAULT 'AWAITING';

-- AlterTable
ALTER TABLE `Designation` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Event` MODIFY `start_time` DATETIME(0) NOT NULL,
    MODIFY `end_time` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `EventAssignment` MODIFY `event_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Hospital` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Leave` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `start_date` DATETIME(0) NOT NULL,
    MODIFY `end_date` DATETIME(0) NOT NULL,
    MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NOT NULL DEFAULT 'AWAITING',
    MODIFY `leaveType` ENUM('ANNUAL', 'COMPASSIONATE', 'PARENTAL', 'SICK', 'UNPAID') NOT NULL DEFAULT 'ANNUAL';

-- AlterTable
ALTER TABLE `Location` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `campus_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Swap` MODIFY `from_user` INTEGER NOT NULL,
    MODIFY `to_user` INTEGER NOT NULL,
    MODIFY `event_id` INTEGER NOT NULL,
    MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NOT NULL DEFAULT 'AWAITING';

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `hospital_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AssignmentRequest` ADD CONSTRAINT `AssignmentRequest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssignmentRequest` ADD CONSTRAINT `AssignmentRequest_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventAssignment` ADD CONSTRAINT `EventAssignment_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventAssignment` ADD CONSTRAINT `EventAssignment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `Campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_3` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

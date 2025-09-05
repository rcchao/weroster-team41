-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `group_id` INTEGER NULL,
    `location_id` INTEGER NULL,

    INDEX `group_id`(`group_id`),
    INDEX `location_id`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityGroup` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignmentRequest` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `event_id` INTEGER NULL,
    `status` VARCHAR(255) NULL,

    INDEX `event_id`(`event_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campus` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `hospital_id` INTEGER NULL,

    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Designation` (
    `id` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL,
    `activity_id` INTEGER NULL,
    `location_id` INTEGER NULL,
    `start_time` DATETIME(0) NULL,
    `end_time` DATETIME(0) NULL,

    INDEX `activity_id`(`activity_id`),
    INDEX `location_id`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAssignment` (
    `id` INTEGER NOT NULL,
    `event_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `designation_id` INTEGER NULL,

    INDEX `designation_id`(`designation_id`),
    INDEX `event_id`(`event_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leave` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `leave_type_id` INTEGER NULL,
    `start_date` DATETIME(0) NULL,
    `end_date` DATETIME(0) NULL,
    `status` VARCHAR(255) NULL,

    INDEX `leave_type_id`(`leave_type_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `campus_id` INTEGER NULL,

    INDEX `campus_id`(`campus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roster` (
    `id` INTEGER NOT NULL,
    `campus_id` INTEGER NULL,
    `hospital_id` INTEGER NULL,
    `week_start` DATETIME(0) NULL,

    INDEX `campus_id`(`campus_id`),
    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `designation_id` INTEGER NULL,
    `campus_id` INTEGER NULL,
    `hospital_id` INTEGER NULL,
    `role` VARCHAR(255) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `campus_id`(`campus_id`),
    INDEX `designation_id`(`designation_id`),
    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `ActivityGroup`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssignmentRequest` ADD CONSTRAINT `AssignmentRequest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssignmentRequest` ADD CONSTRAINT `AssignmentRequest_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Campus` ADD CONSTRAINT `Campus_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventAssignment` ADD CONSTRAINT `EventAssignment_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventAssignment` ADD CONSTRAINT `EventAssignment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventAssignment` ADD CONSTRAINT `EventAssignment_ibfk_3` FOREIGN KEY (`designation_id`) REFERENCES `Designation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `LeaveType`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `Campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Roster` ADD CONSTRAINT `Roster_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `Campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Roster` ADD CONSTRAINT `Roster_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`designation_id`) REFERENCES `Designation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_2` FOREIGN KEY (`campus_id`) REFERENCES `Campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_3` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

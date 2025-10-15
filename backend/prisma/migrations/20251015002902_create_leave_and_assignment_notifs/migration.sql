-- CreateTable
CREATE TABLE `AssignmentRequestNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `required_action` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `assignment_request` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    INDEX `assignment_request`(`assignment_request`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `required_action` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `leave_request` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    INDEX `leave_request`(`leave_request`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignmentRequestNotification` ADD CONSTRAINT `AssignmentRequestNotification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssignmentRequestNotification` ADD CONSTRAINT `AssignmentRequestNotification_assignment_request_fkey` FOREIGN KEY (`assignment_request`) REFERENCES `AssignmentRequest`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LeaveNotification` ADD CONSTRAINT `LeaveNotification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LeaveNotification` ADD CONSTRAINT `LeaveNotification_leave_request_fkey` FOREIGN KEY (`leave_request`) REFERENCES `Leave`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

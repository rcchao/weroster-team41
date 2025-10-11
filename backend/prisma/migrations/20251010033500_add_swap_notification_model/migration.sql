-- CreateTable
CREATE TABLE `SwapNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `required_action` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `swap_request` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    INDEX `swap_request`(`swap_request`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SwapNotification` ADD CONSTRAINT `SwapNotification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SwapNotification` ADD CONSTRAINT `SwapNotification_swap_request_fkey` FOREIGN KEY (`swap_request`) REFERENCES `Swap`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

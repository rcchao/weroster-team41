/*
  Warnings:

  - You are about to drop the column `required_action` on the `SwapNotification` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `SwapNotification` table. All the data in the column will be lost.
  - Added the required column `from_user` to the `SwapNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user` to the `SwapNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SwapNotification` DROP FOREIGN KEY `SwapNotification_user_id_fkey`;

-- DropIndex
DROP INDEX `user_id` ON `SwapNotification`;

-- AlterTable
ALTER TABLE `SwapNotification` DROP COLUMN `required_action`,
    DROP COLUMN `user_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `from_user` INTEGER NOT NULL,
    ADD COLUMN `requires_action` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `to_user` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `from_user` ON `SwapNotification`(`from_user`);

-- AddForeignKey
ALTER TABLE `SwapNotification` ADD CONSTRAINT `SwapNotification_from_user_fkey` FOREIGN KEY (`from_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

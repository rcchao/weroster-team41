/*
  Warnings:

  - You are about to alter the column `status` on the `AssignmentRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(4))`.
  - You are about to alter the column `status` on the `Leave` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(4))`.
  - You are about to alter the column `status` on the `Swap` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(4))`.
  - You are about to alter the column `preference` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `AssignmentRequest` MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NULL DEFAULT 'AWAITING';

-- AlterTable
ALTER TABLE `Leave` MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NULL DEFAULT 'AWAITING';

-- AlterTable
ALTER TABLE `Swap` MODIFY `status` ENUM('AWAITING', 'APPROVED', 'DECLINED') NULL DEFAULT 'AWAITING';

-- AlterTable
ALTER TABLE `User` MODIFY `preference` ENUM('PREFERENCE1', 'PREFERENCE2', 'PREFERENCE3') NULL;

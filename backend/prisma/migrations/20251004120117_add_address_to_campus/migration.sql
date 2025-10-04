/*
  Warnings:

  - Made the column `name` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Activity` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Campus` ADD COLUMN `address` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `last_name` VARCHAR(255) NOT NULL;

/*
  Warnings:

  - Made the column `pay` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- 1. Update existing NULL values
UPDATE `Event`
SET `pay` = 200
WHERE `pay` IS NULL;

-- 2. Alter the column to have a default and be non-nullable
ALTER TABLE `Event`
MODIFY `pay` INTEGER NOT NULL DEFAULT 0;


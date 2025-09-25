/*
  Warnings:

  - Made the column `filterType` on table `SavedFilters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `SavedFilters` MODIFY `filterType` ENUM('EVENTS', 'USERS') NOT NULL;

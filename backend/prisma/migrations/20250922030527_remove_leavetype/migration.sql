/*
  Warnings:

  - You are about to drop the `LeaveType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Leave` DROP FOREIGN KEY `Leave_ibfk_2`;

-- DropTable
DROP TABLE `LeaveType`;

/*
  Warnings:

  - You are about to drop the column `userId` on the `teams` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_teamId_key";

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "userId";

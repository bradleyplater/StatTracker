/*
  Warnings:

  - You are about to drop the column `adminForTeamId` on the `Players` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_adminForTeamId_fkey";

-- AlterTable
ALTER TABLE "Players" DROP COLUMN "adminForTeamId";

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

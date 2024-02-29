/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `Players` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_authId_fkey";

-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "adminForTeamId" TEXT,
ALTER COLUMN "authId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Players_authId_key" ON "Players"("authId");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_adminForTeamId_fkey" FOREIGN KEY ("adminForTeamId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

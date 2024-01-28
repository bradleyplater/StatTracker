/*
  Warnings:

  - You are about to drop the column `goals` on the `Games` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "goals";

-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

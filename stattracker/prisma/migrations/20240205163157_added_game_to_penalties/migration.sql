/*
  Warnings:

  - Added the required column `gameId` to the `Penalties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Penalties" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Penalties" ADD CONSTRAINT "Penalties_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

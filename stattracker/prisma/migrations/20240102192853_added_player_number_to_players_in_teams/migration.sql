/*
  Warnings:

  - A unique constraint covering the columns `[playerNumber]` on the table `PlayersInTeams` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PlayersInTeams" ADD COLUMN     "playerNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInTeams_playerNumber_key" ON "PlayersInTeams"("playerNumber");

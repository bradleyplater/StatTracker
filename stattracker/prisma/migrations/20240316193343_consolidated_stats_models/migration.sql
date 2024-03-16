/*
  Warnings:

  - You are about to drop the `PlayerTeamStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerTeamStats" DROP CONSTRAINT "PlayerTeamStats_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTeamStats" DROP CONSTRAINT "PlayerTeamStats_seasonId_fkey";

-- AlterTable
ALTER TABLE "PlayerStats" ADD COLUMN     "teamId" TEXT;

-- DropTable
DROP TABLE "PlayerTeamStats";

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "PlayersInTeams"("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

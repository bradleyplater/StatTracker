/*
  Warnings:

  - The primary key for the `Goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `Penalties` table. All the data in the column will be lost.
  - You are about to drop the column `gamesPlayed` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAssists` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfGoals` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `totalPenaltyDuration` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the `_GamesToPlayerStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_assistedBy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[playerId]` on the table `PlayersInTeams` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_scoredByPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Penalties" DROP CONSTRAINT "Penalties_playerId_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToPlayerStats" DROP CONSTRAINT "_GamesToPlayerStats_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToPlayerStats" DROP CONSTRAINT "_GamesToPlayerStats_B_fkey";

-- DropForeignKey
ALTER TABLE "_assistedBy" DROP CONSTRAINT "_assistedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_assistedBy" DROP CONSTRAINT "_assistedBy_B_fkey";

-- AlterTable
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_pkey",
ADD COLUMN     "assistedById" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Goals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Goals_id_seq";

-- AlterTable
ALTER TABLE "Penalties" DROP COLUMN "playerId";

-- AlterTable
ALTER TABLE "PlayersInTeams" DROP COLUMN "gamesPlayed",
DROP COLUMN "numberOfAssists",
DROP COLUMN "numberOfGoals",
DROP COLUMN "totalPenaltyDuration",
DROP COLUMN "totalPoints";

-- DropTable
DROP TABLE "_GamesToPlayerStats";

-- DropTable
DROP TABLE "_assistedBy";

-- CreateTable
CREATE TABLE "PlayerTeamStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "numberOfGoals" INTEGER DEFAULT 0,
    "numberOfAssists" INTEGER DEFAULT 0,
    "gamesPlayed" INTEGER DEFAULT 0,
    "pims" INTEGER DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "totalPenaltyDuration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerTeamStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GamesToPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlayers_AB_unique" ON "_GamesToPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlayers_B_index" ON "_GamesToPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInTeams_playerId_key" ON "PlayersInTeams"("playerId");

-- AddForeignKey
ALTER TABLE "PlayerTeamStats" ADD CONSTRAINT "PlayerTeamStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "PlayersInTeams"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeamStats" ADD CONSTRAINT "PlayerTeamStats_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlayers" ADD CONSTRAINT "_GamesToPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlayers" ADD CONSTRAINT "_GamesToPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

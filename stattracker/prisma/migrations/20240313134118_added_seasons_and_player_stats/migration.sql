/*
  Warnings:

  - You are about to drop the column `gamesPlayed` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAssists` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfGoals` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `pims` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `totalPenaltyDuration` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the `_GamesToPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_scoredByPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Penalties" DROP CONSTRAINT "Penalties_playerId_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToPlayers" DROP CONSTRAINT "_GamesToPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToPlayers" DROP CONSTRAINT "_GamesToPlayers_B_fkey";

-- DropForeignKey
ALTER TABLE "_assistedBy" DROP CONSTRAINT "_assistedBy_B_fkey";

-- AlterTable
ALTER TABLE "Players" DROP COLUMN "gamesPlayed",
DROP COLUMN "numberOfAssists",
DROP COLUMN "numberOfGoals",
DROP COLUMN "pims",
DROP COLUMN "totalPenaltyDuration",
DROP COLUMN "totalPoints";

-- DropTable
DROP TABLE "_GamesToPlayers";

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "numberOfGoals" INTEGER,
    "numberOfAssists" INTEGER,
    "gamesPlayed" INTEGER,
    "pims" INTEGER,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "totalPenaltyDuration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GamesToPlayerStats" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlayerStats_AB_unique" ON "_GamesToPlayerStats"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlayerStats_B_index" ON "_GamesToPlayerStats"("B");

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_scoredByPlayerId_fkey" FOREIGN KEY ("scoredByPlayerId") REFERENCES "PlayerStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalties" ADD CONSTRAINT "Penalties_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "PlayerStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlayerStats" ADD CONSTRAINT "_GamesToPlayerStats_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlayerStats" ADD CONSTRAINT "_GamesToPlayerStats_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assistedBy" ADD CONSTRAINT "_assistedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

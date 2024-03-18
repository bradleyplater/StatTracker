/*
  Warnings:

  - The primary key for the `Goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gamesPlayed` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAssists` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfGoals` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `pims` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `totalPenaltyDuration` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `gamesPlayed` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfAssists` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfGoals` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `totalPenaltyDuration` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `PlayersInTeams` table. All the data in the column will be lost.
  - You are about to drop the `_assistedBy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[playerId]` on the table `PlayersInTeams` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_scoredByPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Penalties" DROP CONSTRAINT "Penalties_playerId_fkey";

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
ALTER TABLE "Players" DROP COLUMN "gamesPlayed",
DROP COLUMN "numberOfAssists",
DROP COLUMN "numberOfGoals",
DROP COLUMN "pims",
DROP COLUMN "totalPenaltyDuration",
DROP COLUMN "totalPoints",
DROP COLUMN "userid";

-- AlterTable
ALTER TABLE "PlayersInTeams" DROP COLUMN "gamesPlayed",
DROP COLUMN "numberOfAssists",
DROP COLUMN "numberOfGoals",
DROP COLUMN "totalPenaltyDuration",
DROP COLUMN "totalPoints";

-- DropTable
DROP TABLE "_assistedBy";

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "numberOfGoals" INTEGER DEFAULT 0,
    "numberOfAssists" INTEGER DEFAULT 0,
    "gamesPlayed" INTEGER DEFAULT 0,
    "pims" INTEGER DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "totalPenaltyDuration" INTEGER NOT NULL DEFAULT 0,
    "teamId" TEXT,

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

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInTeams_playerId_key" ON "PlayersInTeams"("playerId");

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "PlayersInTeams"("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insert season for 2023-2024
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN110', '2023-2024', '2023-10-01T00:00:00.000Z', '2024-09-30T23:59:59.000Z');

-- Insert season for 2024-2025
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN120', '2024-2025', '2024-10-01T00:00:00.000Z', '2025-09-30T23:59:59.000Z');

-- Insert season for 2025-2026
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN130', '2025-2026', '2025-10-01T00:00:00.000Z', '2026-09-30T23:59:59.000Z');

-- Insert season for 2026-2027
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN140', '2026-2027', '2026-10-01T00:00:00.000Z', '2027-09-30T23:59:59.000Z');

-- Insert season for 2027-2028
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN150', '2027-2028', '2027-10-01T00:00:00.000Z', '2028-09-30T23:59:59.000Z');
/*
  Warnings:

  - The primary key for the `Players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlayersInTeams` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PlayersInTeams" DROP CONSTRAINT "PlayersInTeams_playerId_fkey";

-- AlterTable
ALTER TABLE "Players" DROP CONSTRAINT "Players_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Players_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Players_id_seq";

-- AlterTable
ALTER TABLE "PlayersInTeams" DROP CONSTRAINT "PlayersInTeams_pkey",
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlayersInTeams_pkey" PRIMARY KEY ("playerId", "teamId");

-- AddForeignKey
ALTER TABLE "PlayersInTeams" ADD CONSTRAINT "PlayersInTeams_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

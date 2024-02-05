-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayersInTeams" ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayersInTeams" ADD COLUMN     "numberOfAssists" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfGoals" INTEGER NOT NULL DEFAULT 0;

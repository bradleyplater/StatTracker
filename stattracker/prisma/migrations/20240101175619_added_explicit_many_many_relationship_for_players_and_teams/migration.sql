/*
  Warnings:

  - You are about to drop the `_PlayersToTeams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayersToTeams" DROP CONSTRAINT "_PlayersToTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayersToTeams" DROP CONSTRAINT "_PlayersToTeams_B_fkey";

-- DropTable
DROP TABLE "_PlayersToTeams";

-- CreateTable
CREATE TABLE "PlayersInTeams" (
    "playerId" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "PlayersInTeams_pkey" PRIMARY KEY ("playerId","teamId")
);

-- AddForeignKey
ALTER TABLE "PlayersInTeams" ADD CONSTRAINT "PlayersInTeams_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInTeams" ADD CONSTRAINT "PlayersInTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

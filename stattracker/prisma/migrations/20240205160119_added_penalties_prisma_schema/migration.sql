-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "totalPenaltyDuration" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayersInTeams" ADD COLUMN     "totalPenaltyDuration" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Penalties" (
    "id" SERIAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Penalties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penalties" ADD CONSTRAINT "Penalties_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

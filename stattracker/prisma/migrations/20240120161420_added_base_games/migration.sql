/*
  Warnings:

  - You are about to drop the column `assists` on the `Players` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `Players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Players" DROP COLUMN "assists",
DROP COLUMN "goals",
ADD COLUMN     "numberOfGoals" INTEGER;

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "teamCreatedBy" TEXT NOT NULL,
    "opponentTeam" TEXT NOT NULL,
    "isHome" BOOLEAN NOT NULL,
    "goalsConceeded" INTEGER NOT NULL,
    "goalsScored" INTEGER NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "scoredByPlayerId" TEXT NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_assistedBy" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_assistedBy_AB_unique" ON "_assistedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_assistedBy_B_index" ON "_assistedBy"("B");

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_scoredByPlayerId_fkey" FOREIGN KEY ("scoredByPlayerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assistedBy" ADD CONSTRAINT "_assistedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assistedBy" ADD CONSTRAINT "_assistedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "Players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_playersToteams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shooting_side` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- DropForeignKey
ALTER TABLE "_playersToteams" DROP CONSTRAINT "_playersToteams_A_fkey";

-- DropForeignKey
ALTER TABLE "_playersToteams" DROP CONSTRAINT "_playersToteams_B_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "fk_shooting_side";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "fk_userid";

-- DropTable
DROP TABLE "_playersToteams";

-- DropTable
DROP TABLE "players";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "shooting_side";

-- DropTable
DROP TABLE "teams";

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "shooting_side" INTEGER,
    "userid" TEXT,
    "firstName" TEXT,
    "surname" TEXT,
    "goals" INTEGER,
    "assists" INTEGER,
    "gamesPlayed" INTEGER,
    "pims" INTEGER,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shooting_side" (
    "id" INTEGER NOT NULL,
    "side" VARCHAR(255) NOT NULL,

    CONSTRAINT "Shooting_side_pkey" PRIMARY KEY ("id")
);

-- InsertIntoTable
insert into "Shooting_side" (id, side)
values
  (1, 'Not Specified'),
  (2, 'Right'),
  (3, 'Left');

-- CreateTable
CREATE TABLE "_PlayersToTeams" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_name_key" ON "Teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shooting_side_side_key" ON "Shooting_side"("side");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayersToTeams_AB_unique" ON "_PlayersToTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayersToTeams_B_index" ON "_PlayersToTeams"("B");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "fk_shooting_side" FOREIGN KEY ("shooting_side") REFERENCES "Shooting_side"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "fk_userid" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersToTeams" ADD CONSTRAINT "_PlayersToTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersToTeams" ADD CONSTRAINT "_PlayersToTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

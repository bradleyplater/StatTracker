/*
  Warnings:

  - Added the required column `playerId` to the `Penalties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Penalties" ADD COLUMN     "playerId" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `teamCreatedBy` on the `Games` table. All the data in the column will be lost.
  - Added the required column `teamCreatedById` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "teamCreatedBy",
ADD COLUMN     "teamCreatedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_teamCreatedById_fkey" FOREIGN KEY ("teamCreatedById") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

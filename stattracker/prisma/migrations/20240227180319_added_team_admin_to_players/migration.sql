-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "adminForTeamId" TEXT;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_adminForTeamId_fkey" FOREIGN KEY ("adminForTeamId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "fk_shooting_side";

-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "fk_userid";

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_shooting_side_fkey" FOREIGN KEY ("shooting_side") REFERENCES "Shooting_side"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
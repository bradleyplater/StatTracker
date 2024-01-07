-- CreateTable
CREATE TABLE "_playersToteams" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_playersToteams_AB_unique" ON "_playersToteams"("A", "B");

-- CreateIndex
CREATE INDEX "_playersToteams_B_index" ON "_playersToteams"("B");

-- AddForeignKey
ALTER TABLE "_playersToteams" ADD CONSTRAINT "_playersToteams_A_fkey" FOREIGN KEY ("A") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playersToteams" ADD CONSTRAINT "_playersToteams_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

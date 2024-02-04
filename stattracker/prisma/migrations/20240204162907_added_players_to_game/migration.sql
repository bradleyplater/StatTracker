-- CreateTable
CREATE TABLE "_GamesToPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlayers_AB_unique" ON "_GamesToPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlayers_B_index" ON "_GamesToPlayers"("B");

-- AddForeignKey
ALTER TABLE "_GamesToPlayers" ADD CONSTRAINT "_GamesToPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlayers" ADD CONSTRAINT "_GamesToPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

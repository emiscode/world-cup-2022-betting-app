/*
  Warnings:

  - A unique constraint covering the columns `[bettorId,matchId]` on the table `Bet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bet_bettorId_matchId_key" ON "Bet"("bettorId", "matchId");

/*
  Warnings:

  - A unique constraint covering the columns `[userId,poolId]` on the table `Bettor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bettor_userId_poolId_key" ON "Bettor"("userId", "poolId");

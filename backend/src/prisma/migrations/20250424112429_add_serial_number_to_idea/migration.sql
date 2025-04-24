/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Memory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Memory_serialNumber_key" ON "Memory"("serialNumber");

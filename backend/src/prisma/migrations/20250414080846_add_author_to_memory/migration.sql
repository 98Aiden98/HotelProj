/*
  Warnings:

  - Added the required column `authorId` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

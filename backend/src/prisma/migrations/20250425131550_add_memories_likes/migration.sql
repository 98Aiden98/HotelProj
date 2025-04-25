-- CreateTable
CREATE TABLE "MemoryLike" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MemoryLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemoryLike_memoryId_userId_key" ON "MemoryLike"("memoryId", "userId");

-- AddForeignKey
ALTER TABLE "MemoryLike" ADD CONSTRAINT "MemoryLike_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryLike" ADD CONSTRAINT "MemoryLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

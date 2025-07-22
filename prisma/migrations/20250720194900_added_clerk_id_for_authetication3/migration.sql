/*
  Warnings:

  - You are about to drop the `_QuestionToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_B_fkey";

-- DropTable
DROP TABLE "_QuestionToTag";

-- CreateTable
CREATE TABLE "_TOQ" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TOQ_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TOQ_B_index" ON "_TOQ"("B");

-- AddForeignKey
ALTER TABLE "_TOQ" ADD CONSTRAINT "_TOQ_A_fkey" FOREIGN KEY ("A") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TOQ" ADD CONSTRAINT "_TOQ_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

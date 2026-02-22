/*
  Warnings:

  - You are about to drop the `_CategoryToTutorProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Category]` on the table `TutorProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTutorProfile" DROP CONSTRAINT "_CategoryToTutorProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTutorProfile" DROP CONSTRAINT "_CategoryToTutorProfile_B_fkey";

-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "Category" TEXT;

-- DropTable
DROP TABLE "_CategoryToTutorProfile";

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_Category_key" ON "TutorProfile"("Category");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_Category_fkey" FOREIGN KEY ("Category") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

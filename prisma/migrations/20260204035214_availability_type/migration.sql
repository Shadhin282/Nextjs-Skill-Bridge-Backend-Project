/*
  Warnings:

  - You are about to drop the column `Category` on the `TutorProfile` table. All the data in the column will be lost.
  - The `availability` column on the `TutorProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "TutorProfile" DROP CONSTRAINT "TutorProfile_Category_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "TutorProfile_Category_key";

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "Category",
ADD COLUMN     "categoryId" TEXT,
DROP COLUMN "availability",
ADD COLUMN     "availability" JSONB;

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

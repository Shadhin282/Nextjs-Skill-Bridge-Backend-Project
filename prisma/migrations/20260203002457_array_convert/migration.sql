/*
  Warnings:

  - The `subjects` column on the `TutorProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `availability` column on the `TutorProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "subjects",
ADD COLUMN     "subjects" TEXT[],
DROP COLUMN "availability",
ADD COLUMN     "availability" TEXT[];

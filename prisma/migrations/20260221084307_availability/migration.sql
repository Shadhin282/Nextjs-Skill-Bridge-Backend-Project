/*
  Warnings:

  - You are about to drop the column `availability` on the `TutorProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `TutorProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "availability";

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "day" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Availability_tutorId_key" ON "Availability"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_id_key" ON "TutorProfile"("id");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

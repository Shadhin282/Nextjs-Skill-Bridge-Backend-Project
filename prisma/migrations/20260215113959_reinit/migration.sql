/*
  Warnings:

  - Added the required column `duration` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

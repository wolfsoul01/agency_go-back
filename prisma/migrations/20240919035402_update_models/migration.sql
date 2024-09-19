/*
  Warnings:

  - Made the column `days` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "roomId" DROP NOT NULL,
ALTER COLUMN "days" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

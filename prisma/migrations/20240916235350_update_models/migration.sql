/*
  Warnings:

  - You are about to drop the `Accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccommodationToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccommodationToRoom" DROP CONSTRAINT "_AccommodationToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccommodationToRoom" DROP CONSTRAINT "_AccommodationToRoom_B_fkey";

-- DropTable
DROP TABLE "Accommodation";

-- DropTable
DROP TABLE "_AccommodationToRoom";

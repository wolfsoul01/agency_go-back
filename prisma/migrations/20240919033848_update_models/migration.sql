/*
  Warnings:

  - You are about to drop the column `countryId` on the `Provinces` table. All the data in the column will be lost.
  - Added the required column `totalCost` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeReservation" AS ENUM ('CAR', 'ROOM', 'TRAVEL');

-- AlterTable
ALTER TABLE "Provinces" DROP COLUMN "countryId";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "days" INTEGER,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "TypeReservation" NOT NULL;

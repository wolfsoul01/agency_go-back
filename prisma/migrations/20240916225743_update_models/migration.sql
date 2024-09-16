/*
  Warnings:

  - The values [Ok,Broken,Sold] on the enum `CarStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Single,Double,Suite] on the enum `RoomType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type_license` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `typeLicense` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('A', 'B', 'C1', 'C', 'D1', 'D');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('Pending', 'Confirmed', 'Cancelled');

-- AlterEnum
BEGIN;
CREATE TYPE "CarStatus_new" AS ENUM ('OK', 'BROKEN', 'SOLD');
ALTER TABLE "Car" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Car" ALTER COLUMN "status" TYPE "CarStatus_new" USING ("status"::text::"CarStatus_new");
ALTER TYPE "CarStatus" RENAME TO "CarStatus_old";
ALTER TYPE "CarStatus_new" RENAME TO "CarStatus";
DROP TYPE "CarStatus_old";
ALTER TABLE "Car" ALTER COLUMN "status" SET DEFAULT 'OK';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RoomType_new" AS ENUM ('SINGLE', 'DOUBLE', 'SUITE');
ALTER TABLE "Room" ALTER COLUMN "type" TYPE "RoomType_new" USING ("type"::text::"RoomType_new");
ALTER TYPE "RoomType" RENAME TO "RoomType_old";
ALTER TYPE "RoomType_new" RENAME TO "RoomType";
DROP TYPE "RoomType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "status" SET DEFAULT 'OK';

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "type_license",
ADD COLUMN     "typeLicense" "LicenseType" NOT NULL;

-- DropEnum
DROP TYPE "TypeLicencse";

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "carId" INTEGER,
    "driverId" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "street_1" TEXT,
    "street_2" TEXT,
    "description" TEXT,
    "city" TEXT,
    "coordinateLatitude" TEXT,
    "coordinateLongitude" TEXT,
    "postalCode" TEXT,
    "municipalityId" INTEGER,
    "provinceId" INTEGER,
    "countryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipalities" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "code" TEXT NOT NULL,
    "provinceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "code" TEXT NOT NULL,
    "countryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccommodationToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccommodationToRoom_AB_unique" ON "_AccommodationToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_AccommodationToRoom_B_index" ON "_AccommodationToRoom"("B");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipalities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipalities" ADD CONSTRAINT "Municipalities_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToRoom" ADD CONSTRAINT "_AccommodationToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToRoom" ADD CONSTRAINT "_AccommodationToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

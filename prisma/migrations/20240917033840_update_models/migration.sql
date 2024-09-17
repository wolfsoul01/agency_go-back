/*
  Warnings:

  - The `coordinateLatitude` column on the `Addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `coordinateLongitude` column on the `Addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `addressId` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PENDING', 'ACEPTED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_addressId_fkey";

-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "coordinateLatitude",
ADD COLUMN     "coordinateLatitude" DOUBLE PRECISION,
DROP COLUMN "coordinateLongitude",
ADD COLUMN     "coordinateLongitude" DOUBLE PRECISION,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "addressId",
ADD COLUMN     "address_end_id" INTEGER,
ADD COLUMN     "address_init_id" INTEGER,
ADD COLUMN     "addressesId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TripStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_address_end_id_fkey" FOREIGN KEY ("address_end_id") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_address_init_id_fkey" FOREIGN KEY ("address_init_id") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

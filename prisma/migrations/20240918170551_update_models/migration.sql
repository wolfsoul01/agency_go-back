/*
  Warnings:

  - You are about to drop the column `street_2` on the `Addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "street_2";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

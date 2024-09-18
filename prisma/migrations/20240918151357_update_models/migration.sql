/*
  Warnings:

  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'OUT_OF_SERVICE');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "totalPersons" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "RoomType";

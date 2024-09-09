/*
  Warnings:

  - You are about to drop the column `LastName` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `age` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "LastName",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

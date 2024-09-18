/*
  Warnings:

  - You are about to drop the column `number` on the `Room` table. All the data in the column will be lost.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "number",
ADD COLUMN     "imageId" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

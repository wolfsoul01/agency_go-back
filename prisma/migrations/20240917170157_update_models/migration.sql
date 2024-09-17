-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "imageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

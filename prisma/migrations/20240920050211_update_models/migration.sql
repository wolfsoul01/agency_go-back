-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'Completed';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "customerNotes" TEXT,
ADD COLUMN     "totalPersones" INTEGER;

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReservationDiscount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationDiscount_AB_unique" ON "_ReservationDiscount"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationDiscount_B_index" ON "_ReservationDiscount"("B");

-- AddForeignKey
ALTER TABLE "_ReservationDiscount" ADD CONSTRAINT "_ReservationDiscount_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationDiscount" ADD CONSTRAINT "_ReservationDiscount_B_fkey" FOREIGN KEY ("B") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

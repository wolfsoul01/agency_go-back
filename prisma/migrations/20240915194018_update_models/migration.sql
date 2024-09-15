-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('A', 'B', 'C1', 'D1', 'D');

-- CreateEnum
CREATE TYPE "TypeLicencse" AS ENUM ('A', 'B', 'C1', 'C', 'D1', 'D');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "type" "CarType" NOT NULL DEFAULT 'A';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "type_license" "TypeLicencse" NOT NULL DEFAULT 'A';

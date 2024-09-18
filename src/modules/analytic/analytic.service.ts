import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticService {
  constructor(private readonly prisma: PrismaService) {}

  async getResumeAvailability() {
    const drivers = await this.prisma.driver.findMany();

    const totalCars = await this.prisma.car.count();
    const carsAvailable = await this.prisma.car.findMany({
      where: {
        available: true,
      },
    });
    const carsNotAvailable = await this.prisma.car.findMany({
      where: {
        available: false,
      },
    });

    const totalRooms = await this.prisma.room.count();

    const roomsAvailable = await this.prisma.room.findMany({
      where: {
        available: true,
      },
    });

    const roomsNotAvailable = await this.prisma.room.findMany({
      where: {
        available: false,
      },
    });

    return {
      driversAvailable: drivers,
      driversCount: drivers.length,

      totalCars,
      carsCount: carsAvailable.length,
      carsAvailable,
      carsNotAvailable,

      totalRooms,
      roomsAvailable,
      roomsNotAvailable,
    };
  }

  async getResumeLicencies() {
    const A = await this.prisma.driver.count({
      where: {
        typeLicense: 'A',
      },
    });
    const B = await this.prisma.driver.count({
      where: {
        typeLicense: 'B',
      },
    });
    const C = await this.prisma.driver.count({
      where: {
        typeLicense: 'C',
      },
    });
    const C1 = await this.prisma.driver.count({
      where: {
        typeLicense: 'C1',
      },
    });
    const D = await this.prisma.driver.count({
      where: {
        typeLicense: 'D',
      },
    });
    const D1 = await this.prisma.driver.count({
      where: {
        typeLicense: 'D1',
      },
    });

    return {
      A,
      B,
      C,
      C1,
      D,
      D1,
    };
  }
}

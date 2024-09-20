import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableRooms(startDate: Date, endDate: Date) {
    const availableRooms = await this.prisma.room.findMany({
      where: {
        available: true,
        NOT: {
          Reservation: {
            some: {
              AND: [
                {
                  startDate: {
                    lt: new Date(endDate ?? new Date()) ,
                  },
                },
                {
                  endDate: {
                    gt: new Date(startDate ?? new Date()) ,
                  },
                },
              ],
            },
          },
        },
      },
      include: {
        Image: true,
      },
    });

    return availableRooms;
  }

  async getAvailableCars(startDate: Date, endDate: Date) {
    const availableRooms = await this.prisma.car.findMany({
      where: {
        available: true,
        NOT: {
          Reservation: {
            some: {
              AND: [
                {
                  startDate: {
                    lt: new Date(endDate) ?? new Date(),
                  },
                },
                {
                  endDate: {
                    gt: new Date(startDate),
                  },
                },
              ],
            },
          },
        },
      },
    });

    return availableRooms;
  }
}

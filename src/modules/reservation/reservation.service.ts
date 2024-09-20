import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationStatus, TypeReservation } from '@prisma/client';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { startOfDay } from 'date-fns';
import {
  differenceInDays,
  endOfMonth,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllReservations(startDate: Date, endDate: Date) {
    return await this.prisma.reservation.findMany({
      where: {
        startDate: {
          gte: new Date(startDate) ?? new Date(),
          lte: new Date(endDate) ?? new Date(),
        },
      },
      include: {
        room: {
          include: {
            Image: true,
          },
        },
        user: true,
        car: {
          include: {},
        },
      },
    });
  }
  async findReservations(roomId?: number) {
    return await this.prisma.reservation.findMany({ where: { roomId } });
  }

  async createRoomReservation(dto: CreateReservationDto) {
    const { roomId, startDate, endDate } = dto;

    // if (!isValid(startDate) || !isValid(endDate)) {
    //   throw new BadRequestException('Invalid date format');
    // }

    try {
      const [room, user] = await Promise.all([
        this.prisma.room.findUnique({ where: { id: roomId } }),
        this.prisma.user.findUnique({
          where: { id: dto.userId },
        }),
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!room) {
        throw new NotFoundException('Room not found');
      }

      console.log(isAfter(new Date(), dto.startDate));
      console.log(startOfDay(dto.startDate));
      console.log(new Date());
      if (isAfter(new Date(), startOfDay(dto.startDate))) {
        throw new BadRequestException('Start date must be greater than today');
      }

      if (isBefore(endDate, startDate)) {
        throw new BadRequestException(
          'End date must be greater than start date',
        );
      }

      const totalDays = differenceInDays(startDate, endDate);

      const exitsReservation = await this.prisma.reservation.findFirst({
        where: {
          roomId: roomId,
          startDate: {
            gte: dto.startDate,
            lte: dto.endDate,
          },
          endDate: {
            lte: dto.endDate,
          },
        },
      });

      if (exitsReservation) {
        throw new ConflictException('Room already reserved');
      }

      return await this.prisma.reservation.create({
        data: {
          ...dto,
          days: 1,
          totalCost: room.pricePerNight * totalDays,
          type: TypeReservation.ROOM,
          status: ReservationStatus.Pending,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createCarReservation(dto: CreateReservationDto) {
    const { carId } = dto;

    const card = await this.prisma.room.findUnique({ where: { id: carId } });

    if (!card) {
      throw new Error('Car not found');
    }

    return await this.prisma.reservation.create({
      data: {
        ...dto,
        days: 1,
        totalCost: card.pricePerNight * 1,
        type: TypeReservation.CAR,
        status: ReservationStatus.Pending,
      },
    });
  }

  async cancelReservation(id: number) {
    return this.prisma.reservation.update({
      where: { id },
      data: {
        status: ReservationStatus.Cancelled,
      },
    });
  }
  async confirmReservation(id: number) {
    return this.prisma.reservation.update({
      where: { id },
      data: {
        status: ReservationStatus.Confirmed,
      },
    });
  }

  async getSummaryReservations(date: Date) {
    const moth = startOfMonth(date);
    const endMoth = endOfMonth(date);
    const reservations = await this.prisma.reservation.findMany({
      where: {
        startDate: {
          gte: moth,
          lte: endMoth,
        },
        status: {
          in: [ReservationStatus.Confirmed, ReservationStatus.Pending],
        },
      },
    });

    const totalCost = reservations.reduce(
      (acc, { totalCost }) => acc + totalCost,
      0,
    );

    const totalReservationsCar = reservations.filter(
      (item) => item.type === 'CAR',
    ).length;
    const totalReservationsRoom = reservations.filter(
      (item) => item.type === 'ROOM',
    ).length;

    return {
      totalReservations: reservations.length,
      totalCost,
      totalReservationsCar,
      totalReservationsRoom,
    };
  }
}

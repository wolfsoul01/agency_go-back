import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationStatus, TypeReservation } from '@prisma/client';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllReservations(startDate: Date, endDate: Date) {
    return await this.prisma.reservation.findMany({
      where: {
        startDate: {
          gte: startDate ?? new Date(),
          lte: endDate ?? new Date(),
        },
      },
      include: {
        room: true,
        user: true,
      },
    });
  }
  async findReservations(roomId?: number) {
    return await this.prisma.reservation.findMany({ where: { roomId } });
  }

  async createRoomReservation(dto: CreateReservationDto) {
    const { roomId } = dto;

    const room = await this.prisma.room.findUnique({ where: { id: roomId } });

    if (!room) {
      throw new Error('Room not found');
    }

    return await this.prisma.reservation.create({
      data: {
        ...dto,
        days: 1,
        totalCost: room.pricePerNight * 1,
        type: TypeReservation.ROOM,
        status: ReservationStatus.Pending,
      },
    });
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
}

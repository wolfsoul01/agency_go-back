import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ): Promise<Reservation[]> {
    return this.reservationsService.findAllReservations(startDate, endDate);
  }

  @Get()
  findReservations(): Promise<Reservation[]> {
    return this.reservationsService.findReservations();
  }

  @Post('room')
  createRoomReservation(@Body() dto: CreateReservationDto) {
    if (!dto.roomId) throw new BadRequestException('Room ID is required');
    return this.reservationsService.createRoomReservation(dto);
  }

  @Post('car')
  createCarReservation(@Body() dto: CreateReservationDto) {
    if (!dto.carId) throw new BadRequestException('Car ID is required');

    return this.reservationsService.createCarReservation(dto);
  }

  @Patch(':id/confirm')
  confirmReservation(@Param('id') id: number) {
    return this.reservationsService.confirmReservation(id);
  }
  @Delete(':id/cancel')
  updateReservationStatus(@Param('id') id: number) {
    return this.reservationsService.cancelReservation(id);
  }
}

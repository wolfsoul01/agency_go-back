import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('room')
  createRoomReservation(@Body() dto: CreateReservationDto) {
    return this.reservationsService.createRoomReservation(dto);
  }

  @Post('car')
  createCarReservation(@Body() dto: CreateReservationDto) {
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

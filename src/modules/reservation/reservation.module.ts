import { Module } from '@nestjs/common';
import { ReservationsController } from './reservation.controller';
import { ReservationsService } from './reservation.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationModule {}

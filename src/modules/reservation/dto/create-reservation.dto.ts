import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateReservationDto {
  startDate: Date;

  endDate: Date;

  @IsOptional()
  @IsNumber()
  roomId?: number;

  @IsOptional()
  @IsNumber()
  carId?: number;

  @IsNumber()
  userId: number;
}

import { IsDate, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  @IsPositive()
  days: number;

  @IsOptional()
  @IsNumber()
  roomId?: number;

  @IsOptional()
  @IsNumber()
  carId?: number;

  @IsNumber()
  userId: number;
}

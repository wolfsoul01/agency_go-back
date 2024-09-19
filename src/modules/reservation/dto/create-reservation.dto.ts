import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  startDate: Date;

  @IsString()
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

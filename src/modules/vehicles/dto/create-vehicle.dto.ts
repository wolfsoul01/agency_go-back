import { CarStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsEnum(['A', 'B', 'C1', 'D1', 'D'])
  type: 'A' | 'B' | 'C' | 'C1' | 'D1' | 'D';

  @IsEnum(CarStatus)
  status: 'OK' | 'BROKEN' | 'SOLD';

  @IsNumber()
  priceForDay: number;
}

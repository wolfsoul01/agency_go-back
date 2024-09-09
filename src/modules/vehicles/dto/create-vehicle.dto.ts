import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  priceForDay: number;
}

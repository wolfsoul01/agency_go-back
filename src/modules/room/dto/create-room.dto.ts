import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Prisma, RoomStatus } from '@prisma/client';

export class CreateRoomDto implements Prisma.RoomCreateInput {
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  totalPersons?: number;

  @IsNumber()
  @IsPositive()
  pricePerNight: number;

  @IsOptional()
  status?: RoomStatus;

  @IsOptional()
  @IsNumber()
  municipalityId: number;

  @IsOptional()
  @IsNumber()
  provinceId: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street_1: string;
}

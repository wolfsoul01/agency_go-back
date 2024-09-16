import { Injectable } from '@nestjs/common';
import { CreateAcomodationDto } from './dto/create-acomodation.dto';
import { UpdateAcomodationDto as UpdateAccommodationDto } from './dto/update-acomodation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AcomodationService {
  constructor(private readonly prisma: PrismaClient) {}
  create(createAcomodationDto: CreateAcomodationDto) {
    return this.prisma.room.create({ data: createAcomodationDto });
  }

  findAll() {
    return this.prisma.room.findMany();
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  update(id: number, updateAcomodationDto: UpdateAccommodationDto) {
    return `This action updates a #${id} acomodation`;
  }

  remove(id: number) {
    return `This action removes a #${id} acomodation`;
  }
}

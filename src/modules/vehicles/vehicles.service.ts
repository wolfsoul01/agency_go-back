import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.car.create({ data: createVehicleDto });
  }

  findAll() {
    return this.prisma.car.findMany();
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.car.update({ where: { id }, data: updateVehicleDto });
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}

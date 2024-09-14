import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
//import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDriverDto: CreateDriverDto) {
    const { age, firstName, lastName, license, phoneNumber } = createDriverDto;

    const passwordDefault = bcrypt.hashSync(license, 10);
    const emailDefault = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@agency.com`;

    const newDriver: Prisma.DriverCreateInput = {
      firstName,
      lastName,
      age,
      phoneNumber,
      license,
      user: undefined,
    };

    const user = await this.prisma.user.create({
      data: {
        email: emailDefault,
        name: firstName + '' + lastName,
        password: passwordDefault,
      },
    });

    newDriver.user = { connect: { id: user.id } };

    return this.prisma.driver.create({ data: newDriver });
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return driver;
  }

  // update(id: number, updateDriverDto: UpdateDriverDto) {
  //   return `This action updates a #${id} driver`;
  // }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}

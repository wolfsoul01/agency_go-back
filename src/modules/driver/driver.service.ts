import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
//import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDriverDto: CreateDriverDto) {
    const {
      createdUser,
      email,
      age,
      firstName,
      lastName,
      license,
      phoneNumber,
      userId,
    } = createDriverDto;

    const passwordDefault = bcrypt.hashSync(email, 10);

    const newDriver: Prisma.DriverCreateInput = {
      firstName,
      lastName,
      age,
      phoneNumber,
      license,
      user: userId ? { connect: { id: userId } } : undefined,
    };

    if (createdUser && !userId) {
      const user = await this.prisma.user.create({
        data: {
          email,
          name: firstName + '' + lastName,
          password: passwordDefault,
        },
      });

      newDriver.user = { connect: { id: user.id } };
    }

    return this.prisma.driver.create({ data: newDriver });
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  findOne(id: number) {
    return this.prisma.driver.findUnique({ where: { id } });
  }

  // update(id: number, updateDriverDto: UpdateDriverDto) {
  //   return `This action updates a #${id} driver`;
  // }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}

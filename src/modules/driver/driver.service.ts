import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDriverDto: CreateDriverDto) {
    const { age, firstName, lastName, license, phoneNumber, typeLicense } =
      createDriverDto;

    const passwordDefault = bcrypt.hashSync(license, 10);
    const emailDefault = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@agency.com`;

    const newDriver: Prisma.DriverCreateInput = {
      firstName,
      lastName,
      age,
      phoneNumber,
      license,
      typeLicense,
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
    return this.prisma.driver.findMany({
      include: {
        image: true,
      },
    });
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return driver;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return this.prisma.driver.update({
      data: {
        ...updateDriverDto,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    const driver = await this.findOne(id);
    const user = await this.prisma.user.findUnique({
      where: { id: driver.userId },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prisma.$transaction([
        this.prisma.driver.delete({ where: { id } }),
        this.prisma.user.delete({ where: { id: driver.userId } }),
      ]);

      return 'Deleted driver';
    } catch (error) {
      throw new Error('Error while removing driver');
    }
  }

  async uploadFile(path: string, fileName: string, driverId: number) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    const serverUrl = 'http://localhost:3001';
    const url = `${serverUrl}/uploads/${fileName}`;

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      const image = await prisma.image.create({
        data: {
          url: url,
          description: fileName,
        },
      });

      await prisma.driver.update({
        where: { id: driverId },
        data: { imageId: image.id },
      });

      return image;
    });
  }
}

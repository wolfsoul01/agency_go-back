import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto) {
    const { municipalityId, city, street_1, provinceId, ...rest } =
      createRoomDto;

    const address = await this.prisma.addresses.create({
      data: {
        city,
        street_1,
        municipalityId,
        provinceId,
      },
    });

    return await this.prisma.room.create({
      data: {
        ...rest,
        addressId: address.id,
      },
    });
  }

  findAll() {
    return this.prisma.room.findMany({
      include: {
        Image: true,
        Address: {
          include: {
            Municipalities: true,
            Provinces: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        Image: true,
        Address: true,
      },
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const { municipalityId, city, street_1, provinceId, ...rest } =
      updateRoomDto;
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.prisma.addresses.update({
      where: {
        id: room?.addressId,
      },
      data: {
        city,
        municipalityId,
        street_1,
        provinceId,
      },
    });

    return this.prisma.room.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }

  async remove(id: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.prisma.room.delete({
      where: {
        id,
      },
    });

    return `This action removes a #${id} room`;
  }

  async uploadFile(path: string, fileName: string, roomId: number) {
    const driver = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    const serverUrl = 'http://localhost:3001';
    const url = `${serverUrl}/uploads/${fileName}`;

    if (!driver) {
      throw new NotFoundException('Room not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      const image = await prisma.image.create({
        data: {
          url: url,
          description: fileName,
        },
      });

      await prisma.room.update({
        where: { id: roomId },
        data: { imageId: image.id },
      });

      return image;
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}
  getProvinces() {
    return this.prisma.provinces.findMany();
  }
  getMunicipalities() {
    return this.prisma.municipalities.findMany();
  }
  getMunicipalitiesForProvince(provinceId: number) {
    console.log('provinceId', provinceId);
    return this.prisma.municipalities.findMany({
      where: { provinceId },
    });
  }
}

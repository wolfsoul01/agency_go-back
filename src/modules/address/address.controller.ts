import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('municipalities')
  findAll() {
    return this.addressService.getMunicipalities();
  }

  @Get('provinces')
  findOne() {
    return this.addressService.getProvinces();
  }
}

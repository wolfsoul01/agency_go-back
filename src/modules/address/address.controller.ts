import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('municipalities')
  findAllMunicipalities() {
    return this.addressService.getMunicipalities();
  }
  @Get('municipalities/:id')
  finAllMuniForProv(@Param('id') id: string) {
    return this.addressService.getMunicipalitiesForProvince(+id);
  }

  @Get('provinces')
  findAllProvinces() {
    return this.addressService.getProvinces();
  }
}

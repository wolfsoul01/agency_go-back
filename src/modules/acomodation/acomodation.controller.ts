import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcomodationService } from './acomodation.service';
import { CreateAcomodationDto } from './dto/create-acomodation.dto';
import { UpdateAcomodationDto } from './dto/update-acomodation.dto';

@Controller('acomodation')
export class AcomodationController {
  constructor(private readonly acomodationService: AcomodationService) {}

  @Post()
  create(@Body() createAcomodationDto: CreateAcomodationDto) {
    return this.acomodationService.create(createAcomodationDto);
  }

  @Get()
  findAll() {
    return this.acomodationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acomodationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcomodationDto: UpdateAcomodationDto) {
    return this.acomodationService.update(+id, updateAcomodationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acomodationService.remove(+id);
  }
}

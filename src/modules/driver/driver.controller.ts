import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    console.log(id);
    return this.driverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(req, file, callback) {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!file) {
          return callback(new Error('No file uploaded'), false);
        }

        const isValid = allowedMimeTypes.includes(file.mimetype);

        if (!isValid) {
          return callback(new Error('Invalid mime type'), false);
        }

        callback(null, isValid);
      },
      storage: diskStorage({
        destination: './static/uploads',
        filename(req, file, callback) {
          const name = file.fieldname + '-' + Date.now();
          const fileExtension = file.mimetype.split('/').pop();
          callback(null, name + '.' + fileExtension);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('driverId') driverId: number,
  ) {
    const { path, filename } = file;

    if (!driverId) {
      throw new BadRequestException('Driver ID is required');
    }

    return this.driverService.uploadFile(path, filename, +driverId);
  }
}

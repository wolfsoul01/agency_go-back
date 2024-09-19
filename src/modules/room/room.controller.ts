import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create({
      ...createRoomDto,
    });
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
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
    @Body('roomId') roomId: number,
  ) {
    const { path, filename } = file;

    if (!roomId) {
      throw new BadRequestException('Room ID is required');
    }

    return this.roomService.uploadFile(path, filename, +roomId);
  }
}

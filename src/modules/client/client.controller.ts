import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('rooms')
  getAvailableRooms(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.clientService.getAvailableRooms(startDate, endDate);
  }
  @Get('cars')
  getAvailableCars(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.clientService.getAvailableCars(startDate, endDate);
  }
}

import { Controller, Get } from '@nestjs/common';
import { AnalyticService } from './analytic.service';

@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('available')
  async getAnalytic() {
    return this.analyticService.getResumeAvailability();
  }
  @Get('licencies')
  async getLicencies() {
    return this.analyticService.getResumeLicencies();
  }
}

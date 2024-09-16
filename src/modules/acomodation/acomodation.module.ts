import { Module } from '@nestjs/common';
import { AcomodationService } from './acomodation.service';
import { AcomodationController } from './acomodation.controller';

@Module({
  controllers: [AcomodationController],
  providers: [AcomodationService],
})
export class AcomodationModule {}

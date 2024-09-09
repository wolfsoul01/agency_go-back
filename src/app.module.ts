import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { DriverModule } from './modules/driver/driver.module';

@Module({
  imports: [PrismaModule, AuthModule, VehiclesModule, DriverModule],
})
export class AppModule {}

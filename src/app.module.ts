import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { DriverModule } from './modules/driver/driver.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    VehiclesModule,
    DriverModule,
    RoomModule,
    UserModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { DriverModule } from './modules/driver/driver.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AnalyticModule } from './modules/analytic/analytic.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    VehiclesModule,
    DriverModule,
    RoomModule,
    UserModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),

    AnalyticModule,

    AddressModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { ParkingModule } from '@/modules/parking/parking.module';
import { Database } from '@/providers/database/postgres/database';
import { VehiclesModule } from '@/modules/vehicles/vehicles.module';
import { CompaniesModule } from '@/modules/company/companies.module';

@Module({
  imports: [
    UsersModule,
    ParkingModule,
    VehiclesModule,
    CompaniesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}

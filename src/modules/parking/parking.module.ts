import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthGuard } from '@/providers/auth/auth.guards';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { Database } from '@/providers/database/postgres/database';
import { VehicleMapper } from '@/modules/vehicles/vehicles.mapper';
import { VehiclesService } from '@/modules/vehicles/vehicles.service';
import { CompaniesService } from '@/modules/company/companies.service';
import { ParkingController } from '@/modules/parking/parking.controller';
import { ParkingCompanyRepository } from '@/modules/parking/parking.repository';
import { VehiclesRepository } from '@/modules/vehicles/vehicles.repository';
import { CompaniesRepository } from '@/modules/company/companies.repository';
import { CompanyMapper } from '@/modules/company/company.mapper';
import { ParkingService } from '@/modules/parking/parking.service';

const parkingProviders = [
  Database,
  AuthGuard,
  RolesGuard,
  VehicleMapper,
  CompanyMapper,
  ParkingService,
  VehiclesService,
  CompaniesService,
  VehiclesRepository,
  CompaniesRepository,
  ParkingCompanyRepository,
];

@Module({
  controllers: [ParkingController],
  providers: parkingProviders,
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${config.get<number>('SECONDS_TO_EXPIRE_TOKEN')}s`,
        },
      }),
    }),
  ],
})
export class ParkingModule {}

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { UsersModule } from '@/modules/users/users.module';
import { UsersService } from '@/modules/users/users.service';
import { CompanyMapper } from '@/modules/company/company.mapper';
import { ParkingModule } from '@/modules/parking/parking.module';
import { Database } from '@/providers/database/postgres/database';
import { ParkingService } from '@/modules/parking/parking.service';
import { UsersController } from '@/modules/users/users.controller';
import { UsersRepository } from '@/modules/users/users.repository';
import { VehicleMapper } from '@/modules/vehicles/vehicles.mapper';
import { VehiclesModule } from '@/modules/vehicles/vehicles.module';
import { CompaniesModule } from '@/modules/company/companies.module';
import { VehiclesService } from '@/modules/vehicles/vehicles.service';
import { CompaniesService } from '@/modules/company/companies.service';
import { ParkingController } from '@/modules/parking/parking.controller';
import { VehiclesController } from '@/modules/vehicles/vehicles.controller';
import { VehiclesRepository } from '@/modules/vehicles/vehicles.repository';
import { CompaniesController } from '@/modules/company/companies.controller';
import { UserRepositoryTest } from '@test/support/repositories/user.repository';
import { CompaniesRepository } from '@/modules/company/companies.repository';
import { ParkingCompanyRepository } from '@/modules/parking/parking.repository';
import { VehicleRepositoryTest } from '@test/support/repositories/vehicle.repository';
import { ParkingRepositoryTest } from '@test/support/repositories/parking.repository';
import { CompanyRepositoryTest } from '@test/support/repositories/company.repository';

const appModule = async (): Promise<INestApplication> => {
  const appModule: TestingModule = await Test.createTestingModule({
    imports: [
      UsersModule,
      ParkingModule,
      VehiclesModule,
      CompaniesModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
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
    controllers: [
      AppController,
      UsersController,
      ParkingController,
      VehiclesController,
      CompaniesController,
    ],
    providers: [
      Database,
      AuthGuard,
      AppService,
      RolesGuard,
      UsersService,
      VehicleMapper,
      CompanyMapper,
      ParkingService,
      VehiclesService,
      UsersRepository,
      CompaniesService,
      VehiclesRepository,
      UserRepositoryTest,
      CompaniesRepository,
      VehicleRepositoryTest,
      ParkingRepositoryTest,
      CompanyRepositoryTest,
      ParkingCompanyRepository,
    ],
  }).compile();

  const app = appModule.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.init();

  return app;
};

export { appModule };

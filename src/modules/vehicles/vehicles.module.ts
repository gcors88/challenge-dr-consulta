import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesRepository } from './vehicles.repository';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { Database } from '@/providers/database/postgres/database';
import { VehicleMapper } from '@/modules/vehicles/vehicles.mapper';

const vehiclesProviders = [
  Database,
  VehiclesService,
  VehiclesRepository,
  AuthGuard,
  RolesGuard,
  VehicleMapper,
];

@Module({
  controllers: [VehiclesController],
  providers: vehiclesProviders,
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
export class VehiclesModule {}

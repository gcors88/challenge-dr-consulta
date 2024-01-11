import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { Database } from '@/providers/database/postgres/database';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { CompanyMapper } from '@/modules/company/company.mapper';

const companiesProviders = [
  Database,
  CompaniesService,
  CompaniesRepository,
  AuthGuard,
  RolesGuard,
  CompanyMapper,
];

@Module({
  controllers: [CompaniesController],
  providers: companiesProviders,
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
export class CompaniesModule {}

import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { Roles } from '@/commons/enums/roles';
import { VehicleType } from '@/commons/enums/vehicle-type';
import { appModule as appTestingModule } from '@test/support/app.module';
import { CompanyModel } from '@/modules/company/entities/company.entity';
import { CompanyRepositoryTest } from '@test/support/repositories/company.repository';
import { VehicleRepositoryTest } from '@test/support/repositories/vehicle.repository';
import { ParkingRepositoryTest } from '@test/support/repositories/parking.repository';
import { generateDefaultCompany } from '@test/fixtures/company/generate-default-company';
import { generateDefaultVehicle } from '@test/fixtures/vehicle/generate-default-vehicle';
import { generateDefaultParking } from '@test/fixtures/parking/generate-default-parking';

describe('Given call #Get /parking/reports/:companyId', () => {
  const tokenMock = `Bearer ${faker.string.uuid()}`;
  let requestHelper: request.SuperTest<request.Test>;
  let appModule: INestApplication;
  let companyRepository: CompanyRepositoryTest;
  let vehicleRepository: VehicleRepositoryTest;
  let parkingRepository: ParkingRepositoryTest;

  beforeAll(async () => {
    appModule = await appTestingModule();
    requestHelper = request(appModule.getHttpServer());
    companyRepository = appModule.get<CompanyRepositoryTest>(
      CompanyRepositoryTest,
    );
    vehicleRepository = appModule.get<VehicleRepositoryTest>(
      VehicleRepositoryTest,
    );
    parkingRepository = appModule.get<ParkingRepositoryTest>(
      ParkingRepositoryTest,
    );
  });

  afterAll(async () => {
    appModule.close();
  });

  describe('When received a valid companyId', () => {
    const vehicles = [];
    const parkings = [];
    let company: CompanyModel;

    beforeEach(async () => {
      jest
        .spyOn(JwtService.prototype, 'decode')
        .mockReturnValue({ exp: new Date().getTime(), roles: [Roles.ADMIN] });

      company = await companyRepository.create(generateDefaultCompany());
      vehicles.push(
        await vehicleRepository.create(
          generateDefaultVehicle({
            type: VehicleType.CAR,
          }),
        ),
        await vehicleRepository.create(
          generateDefaultVehicle({
            type: VehicleType.CAR,
          }),
        ),
        await vehicleRepository.create(
          generateDefaultVehicle({
            type: VehicleType.MOTORCYCLE,
          }),
        ),
      );

      parkings.push(
        await parkingRepository.create({
          ...generateDefaultParking({
            company,
            vehicle: vehicles[0],
          }),
          createdAt: new Date('2024-01-10T08:00:00.000Z'),
        }),
        await parkingRepository.create({
          ...generateDefaultParking({
            company,
            vehicle: vehicles[1],
          }),
          unpark: new Date('2024-01-10T10:00:00.000Z'),
          createdAt: new Date('2024-01-10T08:00:00.000Z'),
        }),
        await parkingRepository.create({
          ...generateDefaultParking({
            company,
            vehicle: vehicles[2],
          }),
          unpark: new Date('2024-01-10T10:00:00.000Z'),
          createdAt: new Date('2024-01-10T08:00:00.000Z'),
        }),
      );
    });

    test('Then must received the payload with the parking reports', async () => {
      const response = await requestHelper
        .get(`/parking/reports/${company.id}`)
        .set('Authorization', tokenMock);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject({
        totalVehiclesParkedByType: [
          { type: VehicleType.CAR, total: 2 },
          { type: VehicleType.MOTORCYCLE, total: 1 },
        ],
        totalVehiclesUnparkedByType: [
          { type: VehicleType.CAR, total: 1 },
          { type: VehicleType.MOTORCYCLE, total: 1 },
        ],
        totalVehiclesParkedPerHour: [{ total: 3, hour: 8 }],
        totalVehiclesUnparkedPerHour: [{ total: 2, hour: 10 }],
      });
    });
  });
});

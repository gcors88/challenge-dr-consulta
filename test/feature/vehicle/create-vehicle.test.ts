import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { Roles } from '@/commons/enums/roles';
import { appModule as appTestingModule } from '@test/support/app.module';
import { VehicleRepositoryTest } from '@test/support/repositories/vehicle.repository';
import { generateDefaultVehicle } from '@test/fixtures/vehicle/generate-default-vehicle';
import { SuccessMessages } from '@/commons/enums/success-messages';
import { getErrorName } from '@/commons/helpers/get-error-name';
import { ErrorMessages } from '@/commons/enums/error-messages';

describe('Given call #Post /vehicles/create', () => {
  const tokenMock = `Bearer ${faker.string.uuid()}`;
  let requestHelper: request.SuperTest<request.Test>;
  let appModule: INestApplication;
  let vehicleRepository: VehicleRepositoryTest;

  beforeAll(async () => {
    appModule = await appTestingModule();
    requestHelper = request(appModule.getHttpServer());
    vehicleRepository = appModule.get<VehicleRepositoryTest>(
      VehicleRepositoryTest,
    );
  });

  afterAll(async () => {
    appModule.close();
  });

  describe('When received a valid payload to create vehicle', () => {
    beforeEach(async () => {
      jest
        .spyOn(JwtService.prototype, 'decode')
        .mockReturnValue({ exp: new Date().getTime(), roles: [Roles.ADMIN] });
    });

    test('Then must create the vehicle in database', async () => {
      const createVehicleBody = generateDefaultVehicle();

      const response = await requestHelper
        .post(`/vehicles/create`)
        .set('Authorization', tokenMock)
        .send(createVehicleBody);

      const newVehicle = await vehicleRepository.findByLicensePlate(
        createVehicleBody.licensePlate,
      );

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toMatchObject({
        vehicleId: newVehicle.id,
        message: SuccessMessages.VEHICLE_CREATED_SUCCESSFULLY,
      });
    });
  });

  describe('When the vehicle already exists', () => {
    const createVehicleBody = generateDefaultVehicle();

    beforeEach(async () => {
      jest
        .spyOn(JwtService.prototype, 'decode')
        .mockReturnValue({ exp: new Date().getTime(), roles: [Roles.ADMIN] });

      await vehicleRepository.create(createVehicleBody);
    });

    test('Then must received a BAD_REQUEST error', async () => {
      const response = await requestHelper
        .post(`/vehicles/create`)
        .set('Authorization', tokenMock)
        .send(createVehicleBody);

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toMatchObject({
        name: getErrorName(ErrorMessages.VEHICLE_ALREADY_EXISTS),
        message: ErrorMessages.VEHICLE_ALREADY_EXISTS,
      });
    });
  });

  describe('When send an invalid payload in body', () => {
    const createVehicleBody = generateDefaultVehicle();

    beforeEach(async () => {
      jest
        .spyOn(JwtService.prototype, 'decode')
        .mockReturnValue({ exp: new Date().getTime(), roles: [Roles.ADMIN] });

      delete createVehicleBody.licensePlate;
    });

    test('Then must received a BAD_REQUEST error', async () => {
      const response = await requestHelper
        .post(`/vehicles/create`)
        .set('Authorization', tokenMock)
        .send(createVehicleBody);

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message[0]).toBe('licensePlate must be a string');
    });
  });
});

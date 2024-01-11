import { INestApplication } from '@nestjs/common';

import { UserRepositoryTest } from '@test/support/repositories/user.repository';
import { CompanyRepositoryTest } from '@test/support/repositories/company.repository';
import { ParkingRepositoryTest } from '@test/support/repositories/parking.repository';
import { VehicleRepositoryTest } from '@test/support/repositories/vehicle.repository';

export const cleanDatabase = async (appModule: INestApplication) => {
  const userRepository = appModule.get<UserRepositoryTest>(UserRepositoryTest);
  const parkingRepository = appModule.get<ParkingRepositoryTest>(
    ParkingRepositoryTest,
  );
  const vehicleRepository = appModule.get<VehicleRepositoryTest>(
    VehicleRepositoryTest,
  );
  const companyRepository = appModule.get<CompanyRepositoryTest>(
    CompanyRepositoryTest,
  );

  await userRepository.deleteMany();
  await parkingRepository.deleteMany();
  await vehicleRepository.deleteMany();
  await companyRepository.deleteMany();
};

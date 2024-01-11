import { faker } from '@faker-js/faker';
import { VehicleType } from '@/commons/enums/vehicle-type';

import { CreateVehicleDto } from '@/modules/vehicles/dto/create-vehicle.dto';
import { generateRandomValueFromEnum } from '@test/support/helpers/generateRandomValueFromEnum';

export const generateDefaultVehicle = (
  fields?: Partial<CreateVehicleDto>,
): CreateVehicleDto => ({
  brand: faker.string.sample(8),
  color: faker.string.sample(8),
  model: faker.string.sample(8),
  licensePlate: faker.string.sample(8),
  type: generateRandomValueFromEnum(VehicleType),
  ...fields,
});

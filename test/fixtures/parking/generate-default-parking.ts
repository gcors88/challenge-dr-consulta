import { faker } from '@faker-js/faker';

import { CreateParkingDto } from '@/modules/parking/dto/create-parking.dto';

export const generateDefaultParking = (
  fields?: Partial<CreateParkingDto>,
): CreateParkingDto => ({
  company: { id: faker.number.int(8) },
  vehicle: { id: faker.number.int(8) },
  ...fields,
});

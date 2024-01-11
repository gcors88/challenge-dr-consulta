import { faker } from '@faker-js/faker';

import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';

export const generateDefaultCompany = (
  fields?: Partial<CreateCompanyDto>,
): CreateCompanyDto => ({
  address: {
    cep: faker.string.alpha(8),
    city: faker.string.alpha(8),
    state: faker.string.alpha(8),
    street: faker.string.alpha(8),
    number: faker.string.alpha(8),
    country: faker.string.alpha(8),
    neighborhood: faker.string.alpha(8),
  },
  cnpj: faker.string.alpha(8),
  name: faker.string.alpha(8),
  phone: faker.string.alpha(8),
  totalCarSpaces: faker.number.int({ min: 1, max: 5 }),
  totalMotorcycleSpaces: faker.number.int({ min: 1, max: 5 }),
  ...fields,
});

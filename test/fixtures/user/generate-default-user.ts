import { faker } from '@faker-js/faker';
import { Roles } from '@/commons/enums/roles';

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { generateRandomValueFromEnum } from '@test/support/helpers/generateRandomValueFromEnum';

export const generateDefaultUser = (
  fields?: Partial<CreateUserDto>,
): CreateUserDto => ({
  name: faker.person.fullName(),
  password: faker.string.uuid(),
  email: faker.internet.email(),
  isActive: faker.datatype.boolean(),
  isPasswordChange: faker.datatype.boolean(),
  roles: [generateRandomValueFromEnum(Roles)],
  ...fields,
});

import { Reflector } from '@nestjs/core';

import { Roles as RolesEnum } from '@/commons/enums/roles';

export const Roles = Reflector.createDecorator<RolesEnum[]>();

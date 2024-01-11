import { Roles } from '@/commons/enums/roles';

export interface UserDto {
  id?: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  isActive: boolean;
  roles: Array<Roles>;
}

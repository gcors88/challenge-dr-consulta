import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from '@/modules/company/dto/user.dto';
import { Database } from '@/providers/database/postgres/database';
import { Connection } from '@/providers/database/postgres/interfaces/connection';
import { Roles } from '@/commons/enums/roles';

@Injectable()
export class UsersRepository {
  private repository: Repository<UserModel>;
  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(UserModel);
  }

  public async create(data: CreateUserDto): Promise<UserModel> {
    const user = {
      ...data,
      roles: JSON.stringify(data.roles),
    };

    return this.repository.save(user);
  }

  public async findOne(email: string): Promise<UserDto> {
    const user = await this.repository.findOneBy({ email });

    return user
      ? {
          ...user,
          roles: this.normalizeRoles(user.roles),
        }
      : null;
  }

  public async findById(userId: number): Promise<UserDto> {
    const user = await this.repository.findOneBy({
      id: userId,
    });

    return user
      ? {
          ...user,
          roles: this.normalizeRoles(user.roles),
        }
      : null;
  }

  private normalizeRoles(rolesToNormalize: string): Array<Roles> {
    const roles: Array<string> = JSON.parse(rolesToNormalize);

    return roles.map((role) => Roles[role]);
  }
}

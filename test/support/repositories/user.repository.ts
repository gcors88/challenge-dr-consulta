import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from '@/modules/users/entities/user.entity';
import { Database } from '@/providers/database/postgres/database';
import { Connection } from '@/providers/database/postgres/interfaces/connection';

@Injectable()
export class UserRepositoryTest {
  private repository: Repository<UserModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(UserModel);
  }

  public async create(data: any) {
    return this.repository.save(data);
  }

  public async findAll(): Promise<any> {
    return this.repository.find();
  }

  public async findById(companyId: number): Promise<any> {
    return this.repository.findOne({
      where: {
        id: companyId,
      },
    });
  }

  public async findByEmail(email: string): Promise<any> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  public async deleteMany() {
    await this.repository.createQueryBuilder('user').delete().execute();
  }
}

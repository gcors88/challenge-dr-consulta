import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { CompanyModel } from '@/modules/company/entities/company.entity';
import { Connection } from '@/providers/database/postgres/interfaces/connection';

@Injectable()
export class CompanyRepositoryTest {
  private repository: Repository<CompanyModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(CompanyModel);
  }

  public async create(data: any) {
    const company = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ''),
      address: JSON.stringify(data.address),
    };

    return this.repository.save(company);
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

  public async deleteMany() {
    await this.repository.createQueryBuilder('company').delete().execute();
  }
}

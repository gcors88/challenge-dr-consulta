import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { ParkingCompanyModel } from '@/modules/parking/entities/parking.entity';
import { Connection } from '@/providers/database/postgres/interfaces/connection';

@Injectable()
export class ParkingRepositoryTest {
  private repository: Repository<ParkingCompanyModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(ParkingCompanyModel);
  }

  public async create(data: any) {
    return this.repository.save(data);
  }

  public async findAll(): Promise<any> {
    return this.repository.find();
  }

  public async findById(parkingId: number): Promise<any> {
    return this.repository.findOne({
      where: {
        id: parkingId,
      },
    });
  }

  public async findByCompanyId(companyId) {
    return this.repository
      .createQueryBuilder('parking')
      .innerJoin('parking.company', 'company')
      .where('company.id = :companyId', { companyId })
      .getMany();
  }

  public async deleteMany() {
    await this.repository.createQueryBuilder('parking').delete().execute();
  }
}

import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { VehicleModel } from '@/modules/vehicles/entities/vehicle.entity';
import { Connection } from '@/providers/database/postgres/interfaces/connection';

@Injectable()
export class VehicleRepositoryTest {
  private repository: Repository<VehicleModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(VehicleModel);
  }

  public async create(data: any) {
    return this.repository.save(data);
  }

  public async findAll(): Promise<any> {
    return this.repository.find();
  }

  public async findById(vehicleId: number): Promise<any> {
    return this.repository.findOne({
      where: {
        id: vehicleId,
      },
    });
  }

  public async findByLicensePlate(licensePlate: string): Promise<any> {
    return this.repository.findOne({
      where: {
        licensePlate,
      },
    });
  }

  public async deleteMany() {
    await this.repository.createQueryBuilder('vehicle').delete().execute();
  }
}

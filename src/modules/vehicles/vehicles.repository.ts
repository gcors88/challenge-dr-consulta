import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { Connection } from '@/providers/database/postgres/interfaces/connection';
import { VehicleModel } from '@/modules/vehicles/entities/vehicle.entity';
import { CreateVehicleDto } from '@/modules/vehicles/dto/create-vehicle.dto';
import { FindOneVehicle } from '@/modules/vehicles/dto/find-one-vehicle.dto';
import { FindAllVehicles } from '@/modules/vehicles/dto/find-all-vehicles.dto';
import { VehicleDto } from '@/modules/vehicles/dto/vehicle.dto';
import { VehicleType } from '@/commons/enums/vehicle-type';

@Injectable()
export class VehiclesRepository {
  private repository: Repository<VehicleModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(VehicleModel);
  }

  public async create(vehicle: CreateVehicleDto): Promise<VehicleModel> {
    return this.repository.save({
      ...vehicle,
      licensePlate: vehicle.licensePlate.toUpperCase(),
    });
  }

  public async findOne({
    vehicleId,
    licensePlate,
  }: FindOneVehicle): Promise<VehicleDto> {
    const filters = {
      ...(Boolean(licensePlate) && {
        licensePlate: licensePlate.toUpperCase(),
      }),
      ...(Boolean(vehicleId) && { id: vehicleId }),
    };

    const vehicle = await this.repository.findOneBy(filters);

    return vehicle
      ? {
          ...vehicle,
          type: VehicleType[vehicle.type],
        }
      : null;
  }

  public async deleteOne(vehicleId: number): Promise<void> {
    await this.repository.delete({
      id: vehicleId,
    });
  }

  public async findAll({
    page,
    perPage,
  }: FindAllVehicles): Promise<Array<VehicleDto>> {
    const skip = (page - 1) * perPage;

    const vehicles = await this.repository
      .createQueryBuilder('vehicle')
      .take(perPage)
      .skip(skip)
      .getMany();

    return vehicles.map((vehicle) => ({
      ...vehicle,
      type: VehicleType[vehicle.type],
    }));
  }
}

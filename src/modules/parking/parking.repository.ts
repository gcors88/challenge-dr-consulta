import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { ParkingCompanyModel } from '@/modules/parking/entities/parking.entity';
import { Connection } from '@/providers/database/postgres/interfaces/connection';
import { CreateParkingDto } from '@/modules/parking/dto/create-parking.dto';
import { ParkVehicleDto } from '@/modules/parking/dto/park-vehicle.dto';
import { VehicleType } from '@/commons/enums/vehicle-type';
import { UpdateParkingDto } from '@/modules/parking/dto/update-parking.dto';
import { GetTotalVehiclesParkedAndUnparkedByTypeDto } from '@/modules/parking/dto/get-total-vehicles-parked-and-unparked-by-type.dto';
import { GetTotalVehiclesParkedAndUnparkedPerHourDto } from '@/modules/parking/dto/get-total-vehicles-parked-and-unparked-per-hour.dto';

@Injectable()
export class ParkingCompanyRepository {
  private repository: Repository<ParkingCompanyModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(ParkingCompanyModel);
  }

  public async findOne({
    companyId,
    vehicleId,
  }: ParkVehicleDto): Promise<ParkingCompanyModel> {
    return this.repository
      .createQueryBuilder('parking')
      .innerJoinAndSelect('parking.company', 'company')
      .innerJoinAndSelect('parking.vehicle', 'vehicle')
      .where('company.id = :companyId', { companyId })
      .andWhere('vehicle.id = :vehicleId', { vehicleId })
      .andWhere('parking.unpark is null')
      .getOne();
  }

  public async findAllByCompany(
    companyId: number,
    vehicleType: VehicleType,
  ): Promise<Array<ParkingCompanyModel>> {
    return this.repository
      .createQueryBuilder('parking')
      .innerJoinAndSelect('parking.company', 'company')
      .innerJoinAndSelect('parking.vehicle', 'vehicle')
      .where('company.id = :companyId', { companyId })
      .andWhere('vehicle.type = :vehicleType', { vehicleType })
      .andWhere('parking.unpark is null')
      .getMany();
  }

  public async create(data: CreateParkingDto): Promise<ParkingCompanyModel> {
    return this.repository.save(data);
  }

  public async updateParkingCompany({
    unpark,
    parkingId,
  }: UpdateParkingDto): Promise<void> {
    await this.repository.update({ id: parkingId }, { unpark });
  }

  public async getTotalParkedAndUnparkedByCompany(
    companyId: number,
  ): Promise<GetTotalVehiclesParkedAndUnparkedByTypeDto> {
    const totalVehiclesParkedByType = await this.repository
      .createQueryBuilder('parking')
      .select('count(*)', 'total')
      .addSelect('vehicle.type', 'type')
      .innerJoin('parking.company', 'company')
      .innerJoin('parking.vehicle', 'vehicle')
      .where('company.id = :companyId', { companyId })
      .groupBy('vehicle.type')
      .getRawMany();

    const totalVehiclesUnparkedByType = await this.repository
      .createQueryBuilder('parking')
      .select('count(*)', 'total')
      .addSelect('vehicle.type', 'type')
      .innerJoin('parking.company', 'company')
      .innerJoin('parking.vehicle', 'vehicle')
      .where('company.id = :companyId', { companyId })
      .andWhere('parking.unpark is not null')
      .groupBy('vehicle.type')
      .getRawMany();

    return {
      totalVehiclesParkedByType: totalVehiclesParkedByType.map(
        (totalVehicles) => ({
          ...totalVehicles,
          total: Number(totalVehicles.total),
        }),
      ),
      totalVehiclesUnparkedByType: totalVehiclesUnparkedByType.map(
        (totalVehicles) => ({
          ...totalVehicles,
          total: Number(totalVehicles.total),
        }),
      ),
    };
  }

  public async getTotalVehiclesParkedAndUnparkedPerHourByCompany(
    companyId: number,
  ): Promise<GetTotalVehiclesParkedAndUnparkedPerHourDto> {
    const totalVehiclesParkedPerHour = await this.repository
      .createQueryBuilder('parking')
      .select('count(*)', 'total')
      .addSelect('HOUR(TIME(parking.created_at))', 'hour')
      .innerJoin('parking.company', 'company')
      .where('company.id = :companyId', { companyId })
      .groupBy('HOUR(TIME(parking.created_at))')
      .getRawMany();

    const totalVehiclesUnparkedPerHour = await this.repository
      .createQueryBuilder('parking')
      .select('count(*)', 'total')
      .addSelect('HOUR(TIME(parking.unpark))', 'hour')
      .innerJoin('parking.company', 'company')
      .where('company.id = :companyId', { companyId })
      .andWhere('parking.unpark is not null')
      .groupBy('HOUR(TIME(parking.unpark))')
      .getRawMany();

    return {
      totalVehiclesParkedPerHour: totalVehiclesParkedPerHour.map(
        (totalVehicles) => ({
          ...totalVehicles,
          total: Number(totalVehicles.total),
        }),
      ),
      totalVehiclesUnparkedPerHour: totalVehiclesUnparkedPerHour.map(
        (totalVehicles) => ({
          ...totalVehicles,
          total: Number(totalVehicles.total),
        }),
      ),
    };
  }
}

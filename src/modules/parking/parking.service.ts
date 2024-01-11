import { BadRequestException, Injectable } from '@nestjs/common';

import { VehicleType } from '@/commons/enums/vehicle-type';
import { ParkingCompanyRepository } from './parking.repository';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { CompanyDto } from '@/modules/company/dto/company.dto';
import { getErrorName } from '@/commons/helpers/get-error-name';
import { SuccessMessages } from '@/commons/enums/success-messages';
import { VehiclesService } from '@/modules/vehicles/vehicles.service';
import { CompaniesService } from '@/modules/company/companies.service';
import { ParkVehicleDto } from '@/modules/parking/dto/park-vehicle.dto';
import { UnparkVehicleDto } from '@/modules/parking/dto/unpark-vehicle.dto';
import { ParkingCompanyModel } from '@/modules/parking/entities/parking.entity';
import { ParkCarDefaultResponseDto } from '@/modules/parking/dto/park-car-default-response.dto';
import { GetReportsResponseDto } from '@/modules/parking/dto/get-reports-response.dto';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingRepository: ParkingCompanyRepository,
    private readonly companyService: CompaniesService,
    private readonly vehicleService: VehiclesService,
  ) {}

  public async parkVehicle(
    data: ParkVehicleDto,
  ): Promise<ParkCarDefaultResponseDto> {
    const vehicleParked = await this.parkingRepository.findOne(data);

    this.validateIfVehicleAlreadyParked(vehicleParked);

    const company = await this.companyService.findOne({
      companyId: data.companyId,
    });

    const vehicle = await this.vehicleService.findOne({
      vehicleId: data.vehicleId,
    });

    const vehiclesParked = await this.parkingRepository.findAllByCompany(
      data.companyId,
      vehicle.type,
    );

    this.validateIfThereParkingSpace(company, vehicle.type, vehiclesParked);

    await this.parkingRepository.create({
      company: { id: company.id },
      vehicle,
    });

    return {
      message: SuccessMessages.VEHICLE_PARKED_SUCCESFULLY,
    };
  }

  public async unparkVehicle(
    data: UnparkVehicleDto,
  ): Promise<ParkCarDefaultResponseDto> {
    const vehicleParked = await this.parkingRepository.findOne(data);

    this.validateIfVehicleIsNotParked(vehicleParked);

    await this.parkingRepository.updateParkingCompany({
      parkingId: vehicleParked.id,
      unpark: new Date(),
    });

    return {
      message: SuccessMessages.VEHICLE_UNPARK_SUCCESSFULLY,
    };
  }

  public async getReports(companyId: number): Promise<GetReportsResponseDto> {
    const totalVehiclesParkedAndUnparkedByType =
      await this.parkingRepository.getTotalParkedAndUnparkedByCompany(
        companyId,
      );
    const totalVehiclesParkedAndUnparkedPerHour =
      await this.parkingRepository.getTotalVehiclesParkedAndUnparkedPerHourByCompany(
        companyId,
      );

    return {
      ...totalVehiclesParkedAndUnparkedByType,
      ...totalVehiclesParkedAndUnparkedPerHour,
    };
  }

  private validateIfVehicleAlreadyParked(vehicleParked: ParkingCompanyModel) {
    if (vehicleParked) {
      throw new BadRequestException({
        name: getErrorName(ErrorMessages.THE_VEHICLE_ALREADY_PARKED),
        message: ErrorMessages.THE_VEHICLE_ALREADY_PARKED,
      });
    }
  }

  private validateIfVehicleIsNotParked(vehicleParked: ParkingCompanyModel) {
    if (!vehicleParked) {
      throw new BadRequestException({
        name: getErrorName(ErrorMessages.THE_VEHICLE_IS_NOT_PARKED),
        message: ErrorMessages.THE_VEHICLE_IS_NOT_PARKED,
      });
    }
  }

  private validateIfThereParkingSpace(
    company: CompanyDto,
    vehicleType: VehicleType,
    vehiclesParked: Array<ParkingCompanyModel>,
  ) {
    const companyParkingSpaceDict = {
      [VehicleType.CAR]: 'totalCarSpaces',
      [VehicleType.MOTORCYCLE]: 'totalMotorcycleSpaces',
    };

    const companyParkingSpaceKey = companyParkingSpaceDict[vehicleType];

    if (vehiclesParked.length >= company[companyParkingSpaceKey]) {
      throw new BadRequestException({
        name: getErrorName(
          ErrorMessages.THERE_ARE_NO_MORE_PARKING_SPACES_FOR_THE_TYPE_OF_VEHICLE_REQUESTED,
        ),
        message:
          ErrorMessages.THERE_ARE_NO_MORE_PARKING_SPACES_FOR_THE_TYPE_OF_VEHICLE_REQUESTED,
      });
    }
  }
}

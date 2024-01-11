import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { VehiclesRepository } from './vehicles.repository';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { getErrorName } from '@/commons/helpers/get-error-name';
import { VehicleDto } from '@/modules/vehicles/dto/vehicle.dto';
import { SuccessMessages } from '@/commons/enums/success-messages';
import { VehicleMapper } from '@/modules/vehicles/vehicles.mapper';
import { CreateVehicleDto } from '@/modules/vehicles/dto/create-vehicle.dto';
import { FindOneVehicle } from '@/modules/vehicles/dto/find-one-vehicle.dto';
import { UpdateVehicleDto } from '@/modules/vehicles/dto/update-vehicle.dto';
import { FindAllVehiclesParamsDto } from '@/modules/vehicles/dto/find-all-vehicles.dto';
import { FindOneVehicleResponseDto } from '@/modules/vehicles/dto/find-vehicle-response.dto';
import { VehicleDefaultSuccessResponseDto } from '@/modules/vehicles/dto/vehicle-default-success-response.dto';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehicleRepository: VehiclesRepository,
    private readonly vehicleMapper: VehicleMapper,
  ) {}

  public async create(
    data: CreateVehicleDto,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    const vehicleToValidate = await this.vehicleRepository.findOne({
      licensePlate: data.licensePlate,
    });

    this.validateIfExistsVehicle(vehicleToValidate);

    const vehicle = await this.vehicleRepository.create(data);

    return {
      vehicleId: vehicle.id,
      message: SuccessMessages.VEHICLE_CREATED_SUCCESSFULLY,
    };
  }

  public async findOne(
    data: FindOneVehicle,
  ): Promise<FindOneVehicleResponseDto> {
    const vehicle = await this.vehicleRepository.findOne(data);

    this.validateIfNotExistsVehicle(vehicle);

    return this.vehicleMapper.serializeVehicle(vehicle);
  }

  public async findAll(
    data: FindAllVehiclesParamsDto,
  ): Promise<Array<FindOneVehicleResponseDto>> {
    const vehicles = await this.vehicleRepository.findAll(data);

    return this.vehicleMapper.serializeVehicles(vehicles);
  }

  public async updateVehicle(
    vehicleId: number,
    data: UpdateVehicleDto,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    const vehicle = await this.findOne({ vehicleId });

    await this.vehicleRepository.create({
      ...vehicle,
      ...data,
    });

    return {
      vehicleId,
      message: SuccessMessages.VEHICLE_UPDATED_SUCCESSFULLY,
    };
  }

  public async deleteVehicle(
    vehicleId: number,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    await this.findOne({ vehicleId });

    await this.vehicleRepository.deleteOne(vehicleId);

    return {
      message: SuccessMessages.VEHICLE_DELETED_SUCCESSFULLY,
    };
  }

  private validateIfNotExistsVehicle(vehicle: VehicleDto) {
    if (!vehicle)
      throw new NotFoundException({
        name: getErrorName(ErrorMessages.VEHICLE_NOT_FOUND),
        message: ErrorMessages.VEHICLE_NOT_FOUND,
      });
  }

  private validateIfExistsVehicle(vehicle: VehicleDto) {
    if (vehicle)
      throw new BadRequestException({
        name: getErrorName(ErrorMessages.VEHICLE_ALREADY_EXISTS),
        message: ErrorMessages.VEHICLE_ALREADY_EXISTS,
      });
  }
}

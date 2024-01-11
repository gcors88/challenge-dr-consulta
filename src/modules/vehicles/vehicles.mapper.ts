import { Injectable } from '@nestjs/common';

import { VehicleDto } from '@/modules/vehicles/dto/vehicle.dto';
import { FindOneVehicleResponseDto } from '@/modules/vehicles/dto/find-vehicle-response.dto';

@Injectable()
export class VehicleMapper {
  public serializeVehicle(vehicle: VehicleDto): FindOneVehicleResponseDto {
    return {
      id: vehicle.id,
      type: vehicle.type,
      brand: vehicle.brand,
      color: vehicle.color,
      model: vehicle.model,
      licensePlate: vehicle.licensePlate,
    };
  }

  public serializeVehicles(
    vehicles: Array<VehicleDto>,
  ): Array<FindOneVehicleResponseDto> {
    return vehicles.map((vehicle) => this.serializeVehicle(vehicle));
  }
}

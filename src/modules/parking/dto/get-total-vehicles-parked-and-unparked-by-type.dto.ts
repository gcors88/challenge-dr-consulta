import { ApiProperty } from '@nestjs/swagger';

import { VehicleType } from '@/commons/enums/vehicle-type';

export class DefaultResponseReportsGetTotalVehiclesByTypeDto {
  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  type: VehicleType;

  @ApiProperty()
  total: number;
}

export class GetTotalVehiclesParkedAndUnparkedByTypeDto {
  @ApiProperty({
    type: DefaultResponseReportsGetTotalVehiclesByTypeDto,
    isArray: true,
  })
  totalVehiclesParkedByType: Array<DefaultResponseReportsGetTotalVehiclesByTypeDto>;

  @ApiProperty({
    type: DefaultResponseReportsGetTotalVehiclesByTypeDto,
    isArray: true,
  })
  totalVehiclesUnparkedByType: Array<DefaultResponseReportsGetTotalVehiclesByTypeDto>;
}

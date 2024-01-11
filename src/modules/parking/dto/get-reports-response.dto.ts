import { ApiProperty } from '@nestjs/swagger';

import { DefaultResponseReportsGetTotalVehiclesByTypeDto } from '@/modules/parking/dto/get-total-vehicles-parked-and-unparked-by-type.dto';
import { DefaultResponseReportsGetTotalVehiclesPerHourDto } from '@/modules/parking/dto/get-total-vehicles-parked-and-unparked-per-hour.dto';

export class GetReportsResponseDto {
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

  @ApiProperty({
    type: DefaultResponseReportsGetTotalVehiclesPerHourDto,
    isArray: true,
  })
  totalVehiclesParkedPerHour: Array<DefaultResponseReportsGetTotalVehiclesPerHourDto>;

  @ApiProperty({
    type: DefaultResponseReportsGetTotalVehiclesPerHourDto,
    isArray: true,
  })
  totalVehiclesUnparkedPerHour: Array<DefaultResponseReportsGetTotalVehiclesPerHourDto>;
}

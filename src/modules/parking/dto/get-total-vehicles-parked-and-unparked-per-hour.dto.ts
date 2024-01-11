import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseReportsGetTotalVehiclesPerHourDto {
  @ApiProperty()
  hour: number;

  @ApiProperty()
  total: number;
}

export class GetTotalVehiclesParkedAndUnparkedPerHourDto {
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

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ParkVehicleDto {
  @IsNumber()
  @ApiProperty()
  companyId: number;

  @IsNumber()
  @ApiProperty()
  vehicleId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { VehicleType } from '@/commons/enums/vehicle-type';

export class CreateVehicleDto {
  @IsString()
  @ApiProperty()
  brand: string;

  @IsString()
  @ApiProperty()
  model: string;

  @IsString()
  @ApiProperty()
  color: string;

  @IsString()
  @ApiProperty()
  licensePlate: string;

  @IsEnum(VehicleType)
  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  type: VehicleType;
}

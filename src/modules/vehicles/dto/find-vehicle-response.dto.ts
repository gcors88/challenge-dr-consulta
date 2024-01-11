import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '@/commons/enums/vehicle-type';

export class FindOneVehicleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  type: VehicleType;

  @ApiProperty()
  licensePlate: string;
}

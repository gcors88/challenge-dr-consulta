import { ApiProperty } from '@nestjs/swagger';

import { SuccessMessages } from '@/commons/enums/success-messages';

export class VehicleDefaultSuccessResponseDto {
  @ApiProperty()
  vehicleId?: number;

  @ApiProperty()
  message: SuccessMessages;
}

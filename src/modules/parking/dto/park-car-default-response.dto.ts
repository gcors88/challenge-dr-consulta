import { ApiProperty } from '@nestjs/swagger';

import { SuccessMessages } from '@/commons/enums/success-messages';

export class ParkCarDefaultResponseDto {
  @ApiProperty({ enum: SuccessMessages, enumName: 'SuccessMessages' })
  message: SuccessMessages;
}

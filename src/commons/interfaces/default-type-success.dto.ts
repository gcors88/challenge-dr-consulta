import { ApiProperty } from '@nestjs/swagger';
import { SuccessMessages } from '@/commons/enums/success-messages';

export class DefaultTypeSuccessDto {
  @ApiProperty({ enum: SuccessMessages, enumName: 'SuccessMessages' })
  message: SuccessMessages;
}

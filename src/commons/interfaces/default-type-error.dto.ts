import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessages } from '@/commons/enums/error-messages';

export class DefaultTypeErrorDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ErrorMessages, enumName: 'ErrorMessages' })
  message: ErrorMessages;
}

import { ApiProperty } from '@nestjs/swagger';

import { SuccessMessages } from '@/commons/enums/success-messages';

export class CompanyDefaultSuccessResponseDto {
  @ApiProperty()
  companyId?: number;

  @ApiProperty()
  message: SuccessMessages;
}

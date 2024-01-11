import { ApiProperty } from '@nestjs/swagger';

import { CompanyAddress } from '@/modules/company/dto/company-address.dto';

export class FindOneCompanyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  totalCarSpaces: number;

  @ApiProperty()
  address: CompanyAddress;

  @ApiProperty()
  totalMotorcycleSpaces: number;
}

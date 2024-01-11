import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

import { CompanyAddress } from '@/modules/company/dto/company-address.dto';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  cnpj: string;

  @IsObject()
  @Type(() => CompanyAddress)
  @ValidateNested()
  @ApiProperty({ type: CompanyAddress })
  address: CompanyAddress;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsNumber()
  @ApiProperty()
  totalCarSpaces: number;

  @IsNumber()
  @ApiProperty()
  totalMotorcycleSpaces: number;
}

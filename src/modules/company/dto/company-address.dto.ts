import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyAddress {
  @IsString()
  @ApiProperty()
  cep: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  number: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  neighborhood: string;
}

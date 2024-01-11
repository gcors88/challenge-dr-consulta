import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindAllCompaniesParamsDto {
  @IsNumber()
  @ApiProperty()
  @Transform(({ value = 1 }) => Number(value))
  page: number;

  @Expose({ name: 'per-page' })
  @IsNumber()
  @ApiProperty({ name: 'per-page' })
  @Transform(({ value = 5 }) => Number(value))
  perPage: number;
}

export interface FindAllCompanies {
  page: number;
  perPage: number;
}

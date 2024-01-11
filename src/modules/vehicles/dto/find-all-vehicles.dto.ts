import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FindAllVehiclesParamsDto {
  @IsNumber()
  @Expose()
  @ApiProperty()
  @Transform(({ value = 1 }) => Number(value))
  page: number;

  @Expose({ name: 'per-page' })
  @IsNumber()
  @ApiProperty({ name: 'per-page' })
  @Transform(({ value = 5 }) => Number(value))
  perPage: number;
}

export interface FindAllVehicles {
  page: number;
  perPage: number;
}

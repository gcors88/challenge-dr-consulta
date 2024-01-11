import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';

import { Roles } from '@/commons/enums/roles';

export class SigninResponseDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  refreshToken: string;

  @IsArray()
  @IsEnum(Roles, { each: true })
  @ApiProperty({ enum: Roles, enumName: 'Roles', isArray: true })
  roles: Array<Roles>;
}

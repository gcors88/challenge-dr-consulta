import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { SigninDto } from './signin.dto';
import { Roles } from '@/commons/enums/roles';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends SigninDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isPasswordChange?: boolean;

  @IsArray()
  @IsEnum(Roles, { each: true })
  @ApiProperty({ enum: Roles, enumName: 'Roles', isArray: true })
  roles: Array<Roles>;
}

import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { SigninDto } from './dto/signin.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { Roles } from '@/providers/auth/roles.decorator';
import { Roles as RolesEnum } from '@/commons/enums/roles';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { SigninResponseDto } from '@/modules/users/dto/signin-response.dto';
import { RefreshTokenBodyDto } from '@/modules/users/dto/refresh-token-body.dto';
import { DefaultTypeErrorDto } from '@/commons/interfaces/default-type-error.dto';
import { DefaultTypeSuccessDto } from '@/commons/interfaces/default-type-success.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user on database' })
  @ApiBadRequestResponse({
    description: ErrorMessages.USER_ALREADY_EXISTS,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: DefaultTypeSuccessDto,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('/create')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Signin User' })
  @ApiNotFoundResponse({
    description: ErrorMessages.USER_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: ErrorMessages.INVALID_CREDENTIALS,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: SigninResponseDto,
  })
  @ApiBody({
    type: SigninDto,
  })
  @Post('/signin')
  public async findOne(@Body() body: SigninDto): Promise<SigninResponseDto> {
    return this.usersService.signin(body);
  }

  @ApiBody({
    type: RefreshTokenBodyDto,
  })
  @ApiNotFoundResponse({
    description: ErrorMessages.USER_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: ErrorMessages.EXPIRED_TOKEN,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: SigninResponseDto,
  })
  @ApiOperation({ summary: 'Get new token using refresh token' })
  @Post('/refresh-token')
  public async refreshToken(
    @Body() { refreshToken }: RefreshTokenBodyDto,
  ): Promise<SigninResponseDto> {
    return this.usersService.refreshToken(refreshToken);
  }
}

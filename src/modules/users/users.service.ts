import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessMessages } from '@/commons/enums/success-messages';
import { SigninResponseDto } from '@/modules/users/dto/signin-response.dto';
import { RefreshTokenDto } from '@/modules/users/dto/refresh-token.dto';
import { getErrorName } from '@/commons/helpers/get-error-name';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { UserDto } from '@/modules/company/dto/user.dto';

@Injectable()
export class UsersService {
  private passwordSaltRounds: number;

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltRounds = Number(
      this.configService.get<number>('PASSWORD_SALT_ROUNDS'),
    );
  }

  public async create(createUserDto: CreateUserDto) {
    const validateUser = await this.userRepository.findOne(createUserDto.email);

    if (validateUser) {
      throw new BadRequestException({
        name: getErrorName(ErrorMessages.USER_ALREADY_EXISTS),
        message: ErrorMessages.USER_ALREADY_EXISTS,
      });
    }

    const user: CreateUserDto = {
      ...createUserDto,
      isActive: true,
      isPasswordChange: true,
      password: bcrypt.hashSync(
        createUserDto.password,
        this.passwordSaltRounds,
      ),
    };

    await this.userRepository.create(user);

    return {
      message: SuccessMessages.CREATED_USER_SUCCESSFULLY,
    };
  }

  public async signin({
    email,
    password,
  }: SigninDto): Promise<SigninResponseDto> {
    const user = await this.userRepository.findOne(email);

    this.validateIfExistsUser(user);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        name: getErrorName(ErrorMessages.INVALID_CREDENTIALS),
        message: ErrorMessages.INVALID_CREDENTIALS,
      });
    }

    return this.getSigninProps(user);
  }

  public async refreshToken(refreshToken: string): Promise<SigninResponseDto> {
    const { userId, exp: timeToExpireToken }: RefreshTokenDto =
      this.jwtService.decode(refreshToken);

    const isExpiredToken = Date.now() >= timeToExpireToken * 1000;

    if (isExpiredToken) {
      throw new UnauthorizedException({
        name: getErrorName(ErrorMessages.EXPIRED_TOKEN),
        message: ErrorMessages.EXPIRED_TOKEN,
      });
    }
    const user = await this.userRepository.findById(userId);
    this.validateIfExistsUser(user);

    return this.getSigninProps(user);
  }

  private async getSigninProps(user: UserDto): Promise<SigninResponseDto> {
    const accessToken = await this.jwtService.signAsync({
      name: user.name,
      email: user.email,
      roles: user.roles,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: user.id,
      },
      {
        expiresIn: `${this.configService.get<number>(
          'SECONDS_TO_EXPIRES_REFRESH_TOKEN',
        )}s`,
      },
    );

    return {
      accessToken,
      refreshToken,
      name: user.name,
      roles: user.roles,
    };
  }

  private validateIfExistsUser(user: UserDto) {
    if (!user)
      throw new NotFoundException({
        name: getErrorName(ErrorMessages.USER_NOT_FOUND),
        message: ErrorMessages.USER_NOT_FOUND,
      });
  }
}

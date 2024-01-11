import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

import { ParkingService } from './parking.service';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { Roles } from '@/providers/auth/roles.decorator';
import { Roles as RolesEnum } from '@/commons/enums/roles';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { ParkVehicleDto } from '@/modules/parking/dto/park-vehicle.dto';
import { DefaultTypeErrorDto } from '@/commons/interfaces/default-type-error.dto';
import { ParkCarDefaultResponseDto } from '@/modules/parking/dto/park-car-default-response.dto';
import { UnparkVehicleDto } from '@/modules/parking/dto/unpark-vehicle.dto';
import { GetReportsResponseDto } from '@/modules/parking/dto/get-reports-response.dto';

@Controller('parking')
@ApiTags('Parking')
@ApiBearerAuth()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @ApiOperation({ summary: 'Park vehicle in company' })
  @ApiBadRequestResponse({
    description: ErrorMessages.THE_VEHICLE_ALREADY_PARKED,
    type: DefaultTypeErrorDto,
  })
  @ApiBadRequestResponse({
    description:
      ErrorMessages.THERE_ARE_NO_MORE_PARKING_SPACES_FOR_THE_TYPE_OF_VEHICLE_REQUESTED,
    type: DefaultTypeErrorDto,
  })
  @ApiNotFoundResponse({
    description: ErrorMessages.COMPANY_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiNotFoundResponse({
    description: ErrorMessages.VEHICLE_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: ParkCarDefaultResponseDto,
  })
  @ApiBody({
    type: ParkVehicleDto,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @Post('/park')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async park(
    @Body() body: ParkVehicleDto,
  ): Promise<ParkCarDefaultResponseDto> {
    return this.parkingService.parkVehicle(body);
  }

  @ApiOperation({ summary: 'Park vehicle in company' })
  @ApiBadRequestResponse({
    description: ErrorMessages.THE_VEHICLE_IS_NOT_PARKED,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: ParkCarDefaultResponseDto,
  })
  @ApiBody({
    type: UnparkVehicleDto,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @Patch('/unpark')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async unpark(
    @Body() body: UnparkVehicleDto,
  ): Promise<ParkCarDefaultResponseDto> {
    return this.parkingService.unparkVehicle(body);
  }

  @ApiOperation({ summary: 'Get reports of the parking by company' })
  @ApiOkResponse({
    description: 'Success response',
    type: GetReportsResponseDto,
  })
  @ApiParam({
    name: 'companyId',
    description: 'Id of the company to get reports',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @Get('/reports/:companyId')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async getReportsByCompany(
    @Param('companyId') companyId: number,
  ): Promise<GetReportsResponseDto> {
    return this.parkingService.getReports(companyId);
  }
}

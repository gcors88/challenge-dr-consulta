import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { VehiclesService } from './vehicles.service';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { Roles } from '@/providers/auth/roles.decorator';
import { Roles as RolesEnum } from '@/commons/enums/roles';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { CreateVehicleDto } from '@/modules/vehicles/dto/create-vehicle.dto';
import { VehicleDefaultSuccessResponseDto } from '@/modules/vehicles/dto/vehicle-default-success-response.dto';
import { FindOneVehicleResponseDto } from '@/modules/vehicles/dto/find-vehicle-response.dto';
import { FindAllVehiclesParamsDto } from '@/modules/vehicles/dto/find-all-vehicles.dto';
import { UpdateVehicleDto } from '@/modules/vehicles/dto/update-vehicle.dto';
import { DefaultTypeErrorDto } from '@/commons/interfaces/default-type-error.dto';
import { ErrorMessages } from '@/commons/enums/error-messages';

@Controller('vehicles')
@ApiTags('Vehicles')
@ApiBearerAuth()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'Create vehicle on database' })
  @ApiBadRequestResponse({
    description: ErrorMessages.VEHICLE_ALREADY_EXISTS,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: VehicleDefaultSuccessResponseDto,
  })
  @ApiBody({
    type: CreateVehicleDto,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @Post('/create')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async create(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Find vehicle by license plate' })
  @ApiNotFoundResponse({
    description: ErrorMessages.VEHICLE_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: FindOneVehicleResponseDto,
  })
  @ApiParam({
    name: 'licensePlate',
    description: 'Licence plate of the vechicle to find',
  })
  @Get('/:licensePlate')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async findOne(
    @Param('licensePlate') licensePlate: string,
  ): Promise<FindOneVehicleResponseDto> {
    return this.vehiclesService.findOne({ licensePlate });
  }

  @ApiOperation({ summary: 'Find all vehicles paginated' })
  @ApiOkResponse({
    isArray: true,
    description: 'Success response',
    type: FindOneVehicleResponseDto,
  })
  @Get('/')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async findAll(
    @Query() params: FindAllVehiclesParamsDto,
  ): Promise<Array<FindOneVehicleResponseDto>> {
    return this.vehiclesService.findAll(params);
  }

  @ApiOperation({ summary: 'Update vehicle by id' })
  @ApiNotFoundResponse({
    description: ErrorMessages.VEHICLE_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: VehicleDefaultSuccessResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Primary key of the vehicle to update',
  })
  @ApiBody({
    type: UpdateVehicleDto,
  })
  @Put('/:id')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async updateVehicle(
    @Param('id') vehicleId: number,
    @Body() body: UpdateVehicleDto,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    return this.vehiclesService.updateVehicle(vehicleId, body);
  }

  @ApiOperation({ summary: 'Delete vehicle by id' })
  @ApiNotFoundResponse({
    description: ErrorMessages.VEHICLE_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: VehicleDefaultSuccessResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Primary key of the vehicle to delete',
  })
  @Delete('/:id')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async deleteVehicle(
    @Param('id') vehicleId: number,
  ): Promise<VehicleDefaultSuccessResponseDto> {
    return this.vehiclesService.deleteVehicle(vehicleId);
  }
}

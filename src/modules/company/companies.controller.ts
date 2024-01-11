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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CompaniesService } from './companies.service';
import { AuthGuard } from '@/providers/auth/auth.guards';
import { Roles } from '@/providers/auth/roles.decorator';
import { Roles as RolesEnum } from '@/commons/enums/roles';
import { RolesGuard } from '@/providers/auth/roles.guards';
import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';
import { FindAllCompaniesParamsDto } from '@/modules/company/dto/find-all-companies.dto';
import { UpdateCompanyDto } from '@/modules/company/dto/update-company.dto';
import { FindOneCompanyResponseDto } from '@/modules/company/dto/find-company-response.dto';
import { CompanyDefaultSuccessResponseDto } from '@/modules/company/dto/company-default-success-response.dto';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { DefaultTypeErrorDto } from '@/commons/interfaces/default-type-error.dto';

@Controller('companies')
@ApiTags('Companies')
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'Create company on database' })
  @ApiBadRequestResponse({
    description: ErrorMessages.COMPANY_ALREADY_EXISTS,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: CompanyDefaultSuccessResponseDto,
  })
  @ApiBody({
    type: CreateCompanyDto,
  })
  @Post('/create')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Find company by cnpj' })
  @ApiNotFoundResponse({
    description: ErrorMessages.COMPANY_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: FindOneCompanyResponseDto,
  })
  @ApiParam({
    name: 'cnpj',
    description: 'Cnpj of the company to find',
  })
  @Get('/:cnpj')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async findOne(
    @Param('cnpj') cnpj: string,
  ): Promise<FindOneCompanyResponseDto> {
    return this.companiesService.findOne({ cnpj });
  }

  @ApiOperation({ summary: 'Find all companies paginated' })
  @ApiOkResponse({
    isArray: true,
    description: 'Success response',
    type: FindOneCompanyResponseDto,
  })
  @Get('/')
  @Roles([RolesEnum.ADMIN, RolesEnum.USER])
  @UseGuards(AuthGuard, RolesGuard)
  public async findAll(
    @Query() params: FindAllCompaniesParamsDto,
  ): Promise<Array<FindOneCompanyResponseDto>> {
    return this.companiesService.findAll(params);
  }

  @ApiOperation({ summary: 'Update company by id' })
  @ApiNotFoundResponse({
    description: ErrorMessages.COMPANY_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: CompanyDefaultSuccessResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Primary key of the company to update',
  })
  @ApiBody({
    type: UpdateCompanyDto,
  })
  @Put('/:id')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async updateCompany(
    @Param('id') companyId: number,
    @Body() body: UpdateCompanyDto,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    return this.companiesService.updateCompany(companyId, body);
  }

  @ApiOperation({ summary: 'Delete company by id' })
  @ApiNotFoundResponse({
    description: ErrorMessages.COMPANY_NOT_FOUND,
    type: DefaultTypeErrorDto,
  })
  @ApiOkResponse({
    description: 'Success response',
    type: CompanyDefaultSuccessResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Primary key of the company to delete',
  })
  @Delete('/:id')
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async deleteCompany(
    @Param('id') companyId: number,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    return this.companiesService.deleteCompany(companyId);
  }
}

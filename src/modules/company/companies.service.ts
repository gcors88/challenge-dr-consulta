import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CompaniesRepository } from './companies.repository';
import { ErrorMessages } from '@/commons/enums/error-messages';
import { CompanyDto } from '@/modules/company/dto/company.dto';
import { getErrorName } from '@/commons/helpers/get-error-name';
import { CompanyMapper } from '@/modules/company/company.mapper';
import { SuccessMessages } from '@/commons/enums/success-messages';
import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/company/dto/update-company.dto';
import { FindOneCompany } from '@/modules/company/dto/find-one-company.dto';
import { FindAllCompaniesParamsDto } from '@/modules/company/dto/find-all-companies.dto';
import { FindOneCompanyResponseDto } from '@/modules/company/dto/find-company-response.dto';
import { CompanyDefaultSuccessResponseDto } from '@/modules/company/dto/company-default-success-response.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companyRepository: CompaniesRepository,
    private readonly companyMapper: CompanyMapper,
  ) {}

  public async create(
    data: CreateCompanyDto,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    const companyToValidate = await this.companyRepository.findOne({
      cnpj: data.cnpj,
    });

    this.validateIfExistsCompany(companyToValidate);

    const company = await this.companyRepository.create(data);

    return {
      companyId: company.id,
      message: SuccessMessages.COMPANY_CREATED_SUCCESSFULLY,
    };
  }

  public async findOne(
    data: FindOneCompany,
  ): Promise<FindOneCompanyResponseDto> {
    const company = await this.companyRepository.findOne(data);

    this.validateIfNotExistsCompany(company);

    return this.companyMapper.serializeCompany(company);
  }

  public async findAll(
    data: FindAllCompaniesParamsDto,
  ): Promise<Array<FindOneCompanyResponseDto>> {
    const companies = await this.companyRepository.findAll(data);

    return this.companyMapper.serializeCompanies(companies);
  }

  public async updateCompany(
    companyId: number,
    data: UpdateCompanyDto,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    const company = await this.findOne({ companyId });

    await this.companyRepository.create({
      ...company,
      ...data,
    });

    return {
      companyId,
      message: SuccessMessages.COMPANY_UPDATED_SUCCESSFULLY,
    };
  }

  public async deleteCompany(
    companyId: number,
  ): Promise<CompanyDefaultSuccessResponseDto> {
    await this.findOne({ companyId });

    await this.companyRepository.deleteOne(companyId);

    return {
      message: SuccessMessages.COMPANY_DELETED_SUCCESSFULLY,
    };
  }

  private validateIfNotExistsCompany(company: CompanyDto) {
    if (!company)
      throw new NotFoundException({
        name: getErrorName(ErrorMessages.COMPANY_NOT_FOUND),
        message: ErrorMessages.COMPANY_NOT_FOUND,
      });
  }

  private validateIfExistsCompany(company: CompanyDto) {
    if (company)
      throw new BadRequestException({
        name: getErrorName(ErrorMessages.COMPANY_ALREADY_EXISTS),
        message: ErrorMessages.COMPANY_ALREADY_EXISTS,
      });
  }
}

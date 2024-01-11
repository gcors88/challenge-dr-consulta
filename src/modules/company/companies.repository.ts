import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { FindOneCompany } from '@/modules/company/dto/find-one-company.dto';
import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';
import { Connection } from '@/providers/database/postgres/interfaces/connection';
import { FindAllCompanies } from '@/modules/company/dto/find-all-companies.dto';
import { CompanyDto } from '@/modules/company/dto/company.dto';
import { CompanyModel } from '@/modules/company/entities/company.entity';

@Injectable()
export class CompaniesRepository {
  private repository: Repository<CompanyModel>;

  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(CompanyModel);
  }

  public async create(data: CreateCompanyDto): Promise<CompanyModel> {
    const company = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ''),
      address: JSON.stringify(data.address),
    };

    return this.repository.save(company);
  }

  public async findOne({
    cnpj,
    companyId,
  }: FindOneCompany): Promise<CompanyDto> {
    const filters = {
      ...(Boolean(cnpj) && { cnpj: cnpj.replace(/\D/g, '') }),
      ...(Boolean(companyId) && { id: companyId }),
    };

    const company = await this.repository.findOneBy(filters);

    return company
      ? {
          ...company,
          address: JSON.parse(company.address),
        }
      : null;
  }

  public async deleteOne(companyId: number): Promise<void> {
    await this.repository.delete({
      id: companyId,
    });
  }

  public async findAll({
    page,
    perPage,
  }: FindAllCompanies): Promise<Array<CompanyDto>> {
    const skip = (page - 1) * perPage;

    const companies = await this.repository
      .createQueryBuilder('company')
      .take(perPage)
      .skip(skip)
      .getMany();

    return companies.map((company) => ({
      ...company,
      address: JSON.parse(company.address),
    }));
  }
}

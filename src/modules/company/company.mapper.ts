import { Injectable } from '@nestjs/common';
import { CompanyDto } from '@/modules/company/dto/company.dto';

import { FindOneCompanyResponseDto } from '@/modules/company/dto/find-company-response.dto';

@Injectable()
export class CompanyMapper {
  public serializeCompany(company: CompanyDto): FindOneCompanyResponseDto {
    return {
      id: company.id,
      cnpj: company.cnpj,
      name: company.name,
      phone: company.phone,
      address: company.address,
      totalCarSpaces: company.totalCarSpaces,
      totalMotorcycleSpaces: company.totalMotorcycleSpaces,
    };
  }

  public serializeCompanies(
    companies: Array<CompanyDto>,
  ): Array<FindOneCompanyResponseDto> {
    return companies.map((company) => this.serializeCompany(company));
  }
}

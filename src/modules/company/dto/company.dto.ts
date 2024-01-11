import { CompanyAddress } from '@/modules/company/dto/company-address.dto';

export interface CompanyDto {
  id?: number;
  name: string;
  cnpj: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalCarSpaces: number;
  address: CompanyAddress;
  totalMotorcycleSpaces: number;
}

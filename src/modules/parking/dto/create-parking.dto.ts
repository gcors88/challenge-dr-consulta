import { CompanyModel } from '@/modules/company/entities/company.entity';
import { VehicleModel } from '@/modules/vehicles/entities/vehicle.entity';

export interface CreateParkingDto {
  company: Partial<CompanyModel>;
  vehicle: Partial<VehicleModel>;
}

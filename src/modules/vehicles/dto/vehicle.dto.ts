import { VehicleType } from '@/commons/enums/vehicle-type';

export interface VehicleDto {
  id?: number;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  type: VehicleType;
  createdAt?: Date;
  updatedAt?: Date;
}

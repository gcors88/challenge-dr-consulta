import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VehicleModel } from '../../vehicles/entities/vehicle.entity';
import { CompanyModel } from '../../company/entities/company.entity';

@Entity({ name: 'parking_company' })
export class ParkingCompanyModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => CompanyModel, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyModel;

  @ManyToOne(() => VehicleModel, (company) => company.id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleModel;

  @Column({ nullable: true })
  unpark: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;
}

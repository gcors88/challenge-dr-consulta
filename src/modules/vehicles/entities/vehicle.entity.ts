import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParkingCompanyModel } from '../../parking/entities/parking.entity';

@Entity({ name: 'vehicles' })
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column({ name: 'license_plate', unique: true })
  licensePlate: string;

  @Column()
  type: string;

  @OneToMany(
    () => ParkingCompanyModel,
    (parkingCompany) => parkingCompany.vehicle,
  )
  parkingCompany: ParkingCompanyModel[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;
}

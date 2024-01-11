import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParkingCompanyModel } from '../../parking/entities/parking.entity';

@Entity({ name: 'companies' })
export class CompanyModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ name: 'total_car_spaces' })
  totalCarSpaces: number;

  @Column({ name: 'total_motorcycle_spaces' })
  totalMotorcycleSpaces: number;

  @OneToMany(
    () => ParkingCompanyModel,
    (parkingCompany) => parkingCompany.company,
  )
  parkingCompany: ParkingCompanyModel[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;
}

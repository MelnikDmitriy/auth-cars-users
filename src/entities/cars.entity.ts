import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarBrandEntity } from './car-brands.entity';
import { UserEntity } from './users.entity';

@Entity('cars')
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column()
  number: string;

  @Column()
  bodyType: string;

  @ManyToOne(() => CarBrandEntity)
  brand: CarBrandEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}

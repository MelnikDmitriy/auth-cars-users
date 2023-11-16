
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carBrand')
export class CarBrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;
}

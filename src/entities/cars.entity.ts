import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarBrandEntity } from "./car-brands.entity";

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

        @DeleteDateColumn()
        deletedAt?: Date;   
    }

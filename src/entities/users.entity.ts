import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../enums/user.roles.enum";
import { URL_DEFAULT } from "../constants/environment";


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", nullable: false, length: 30})
    name: string;
    
    @Column({type: "varchar", nullable: false, length: 30})
    lastName: string;

    @Column({type: "varchar", nullable: false, length: 30})
    surname: string;

    @Column({type: "varchar", nullable: false, length: 30})
    phone: string;

    @Column({type: "date", nullable: false})
    dateOfBirth: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: URL_DEFAULT })
    avatar: string;

    @Column({type: "varchar", nullable: false, length: 30})
    role: UserRoles;

    @DeleteDateColumn()
    deletedAt?: Date;
}
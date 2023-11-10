import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../enums/user.roles.enum";


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

    @Column({type: "varchar", nullable: false, length: 15})
    phone: string;

    @Column({type: "date"})
    dateOfBirth: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: "" })
    avatar: string;

    @Column({type: "varchar", nullable: false, length: 30})
    roles: UserRoles;
}
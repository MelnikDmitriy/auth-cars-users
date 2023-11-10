import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";

@Entity({name: "credentials"})
export class CredentialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        unique: true,
        length: 100,
        type: 'varchar',
        select: false,
      })
    login: string;

    @Column({ nullable: false, length: 150, type: 'varchar', select: false })
    password: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({name: "user_id"})
    user: UserEntity;
}
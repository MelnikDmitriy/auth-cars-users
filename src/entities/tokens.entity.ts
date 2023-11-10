import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";

@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, type: "varchar"})
    token: string;

    @JoinColumn({name: "user_id"})
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
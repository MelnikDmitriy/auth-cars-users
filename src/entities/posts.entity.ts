import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column({type: "date"})
    date: string;

    @Column({type: "jsonb", nullable: true})
    images: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'sendBy'})
    sendBy: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'like'})
    like: UserEntity;
    
}
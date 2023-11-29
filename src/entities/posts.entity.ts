  import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UserEntity } from './users.entity';
  import { LikeEntity } from './like.entity';

  @Entity()
  export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 150 })
    text: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: string;

    @Column({ type: 'jsonb', nullable: true })
    images: string[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'sendBy' })
    sendBy: UserEntity;

    @OneToMany(() => LikeEntity, (like) => like.post)
    @JoinColumn({ name: 'likes' })
    likes: LikeEntity[];

    @DeleteDateColumn()
    deletedAt?: Date;
  }

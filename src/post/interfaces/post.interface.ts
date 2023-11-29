import { LikeEntity } from "src/entities/like.entity";
import { UserEntity } from "src/entities/users.entity";

export interface OptionalPost {
    id: string;
    text: string;
    date: string;
    images: string[];
    deletedAt?: Date;
    sendBy: UserEntity;
    likes: LikeEntity[];
}
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from 'src/entities/like.entity';
import { PostEntity } from 'src/entities/posts.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

export class LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  async saveLike(user: UserEntity, post: PostEntity): Promise<LikeEntity> {
    try {
      return this.likeRepository.save({
        likedByUser: user,
        post: post,
      });
    } catch (err) {
      throw new InternalServerErrorException('Не удалось создать лайк');
    }
  }

  async findLike(likeId: string): Promise<LikeEntity> {
    try {
      const like = await this.likeRepository.findOne({
        where: { id: likeId },
      });

      if (!like) {
        throw new BadRequestException('Лайк не найден :(');
      }
      return like;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteLike(like: LikeEntity): Promise<void> {
    try {
      await this.likeRepository.remove(like);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteAllLike(postId: string): Promise<void> {
    try {
      await this.likeRepository.delete({post: {id: postId}});
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}

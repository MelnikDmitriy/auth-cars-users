import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeEntity } from 'src/entities/like.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { PostEntity } from 'src/entities/posts.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userService: UserService,
  ) {}

  async putLike(userId: string, post: PostEntity): Promise<LikeEntity> {
    const user = await this.userService.checkUserById(userId);
    return this.likeRepository.saveLike(user, post);
  }

  async deleteLike(userId: string, likeId: string): Promise<void> {
    await this.userService.checkUserById(userId);
    const like = await this.likeRepository.findLike(likeId);
    await this.likeRepository.deleteLike(like);
  }

  async deleteAllLike(postId: string): Promise<void> {
    await this.likeRepository.deleteAllLike(postId);
  }
}

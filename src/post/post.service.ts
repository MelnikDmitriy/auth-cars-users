import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from 'src/entities/posts.entity';
import { UserService } from 'src/user/user.service';
import { LikeService } from 'src/like/like.service';
import { OptionalPost } from './interfaces/post.interface';
import { LikeEntity } from 'src/entities/like.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly likeService: LikeService
  ) {}

  async createNewPost(userId: string, postDto: PostDto): Promise<PostEntity> {

    const user = await this.userService.checkUserById(userId);
    return this.postRepository.createNewPost(user, postDto);
  }

  async updatePost(userId: string, postDto: UpdatePostDto): Promise<void> {
    await this.userService.checkUserById(userId);
    const { postId, ...updatePost } = postDto;
    return this.postRepository.updatePost(postId, updatePost);
  }

  async deletePost(postId: string): Promise<void> {
    await this.postRepository.softDeletePost(postId);
  }

  async restorePost(postId: string): Promise<void> {
    const post = await this.postRepository.findPost(postId);
    if (!post.deletedAt) {
      throw new BadRequestException('Поста уже нет');
    }
    post.deletedAt = null;
    await this.postRepository.updatePost(postId, post);
  }

  async findDeletePost() {
    return this.postRepository.findDeletePost();
  }

  async deleteSoftPost(postDto: OptionalPost): Promise<void> {
    await this.likeService.deleteAllLike(postDto.id);
    await this.postRepository.deleteSoftPost(postDto);
  }

  checkPostById(postId: string): Promise<PostEntity> {
    return this.postRepository.checkPostById(postId);
  }

  async putLike(userId: string, postId: string): Promise<LikeEntity> {
    const post = await this.postRepository.findPost(postId);
    return this.likeService.putLike(userId, post);
  }

  deleteLike(userId: string, likeId: string): Promise<void> {
    return this.likeService.deleteLike(userId, likeId);
  }
}

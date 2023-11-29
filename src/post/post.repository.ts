import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/posts.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { UserEntity } from 'src/entities/users.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OptionalPost } from './interfaces/post.interface';

export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createNewPost(user: UserEntity, postDto: PostDto): Promise<PostEntity> {
    try {
      return this.postRepository.save({
        ...postDto,
        sendBy: user,
      });
    } catch (err) {
      throw new InternalServerErrorException('Не удалось создать post');
    }
  }

  async updatePost(postId: string, postDto: PostDto): Promise<void> {
    try {
      await this.postRepository.update({ id: postId }, { ...postDto });
    } catch (err) {
      throw new InternalServerErrorException(
        'Не удалось обновить пользователя',
      );
    }
  }

  async findPost(postId: string): Promise<PostEntity> {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId },
        withDeleted: true,
      });

      if (!post) {
        throw new BadRequestException('Запись с таким Id не найдена');
      }

      return post;
    } catch (err) {
      throw new InternalServerErrorException('');
    }
  }

  async findDeletePost() {
    try {
      return this.postRepository.find({
        where: { deletedAt: Not(IsNull()) },
        withDeleted: true,
      });
    } catch (err) {
      throw new BadRequestException('Записи с таким Id нееееет');
    }
  }

  async softDeletePost(postId: string): Promise<void> {
    console.log(postId)
    try {
      await this.postRepository.softDelete(postId)
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteSoftPost(postDto: OptionalPost) {
    try {
      return this.postRepository.remove(postDto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async checkPostById(postId: string): Promise<PostEntity> {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId },
      });

      if (!post) {
        throw new BadRequestException('Поста с таким id нет');
      }
      return post;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}

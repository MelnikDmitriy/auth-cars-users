import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/posts.entity';
import { PostRepository } from './post.repository';
import { UserModule } from 'src/user/user.module';
import { LikeModule } from 'src/like/like.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule, TokenModule, LikeModule],
  providers: [PostService, PostRepository],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}

import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { PostEntity } from 'src/entities/posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user.roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { LikeDto } from 'src/like/dto/like.dto';
import { LikeEntity } from 'src/entities/like.entity';
import { CheckUserId } from 'src/decorators/userId.decorator';
import { PostId } from './interfaces/post-id.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:id')
  createNewPost(
    @Param('id', new ParseUUIDPipe())
    @CheckUserId() checkedUserId: string,
    @Body() postDto: PostDto,
  ): Promise<PostEntity> {
    return this.postService.createNewPost(checkedUserId, postDto);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/:id')
  updatePost(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    @Body() postDto: UpdatePostDto,
  ): Promise<void> {
    return this.postService.updatePost(checkedUserId, postDto);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  deletePost(
    @Param('id')
    @CheckUserId() chekedUserId: string,
    @Body() postId: PostId
    ): Promise<void> {
    return this.postService.deletePost(postId.id);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/restore/:id')
  restorePost(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    @Body() postId: PostId
    ): Promise<void> {
    return this.postService.restorePost(postId.id);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('like/:id')
  putLike(
    @Param('id', new ParseUUIDPipe())
    @CheckUserId() checkedUserId: string,
    @Body() postId: LikeDto,
  ): Promise<LikeEntity> {
    return this.postService.putLike(checkedUserId, postId.id);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('like/:id')
  deleteLike(
    @Param('id', new ParseUUIDPipe())
    @CheckUserId() checkedUserId: string,
    @Body() likeId: LikeDto,
  ): Promise<void> {
    return this.postService.deleteLike(checkedUserId, likeId.id);
  }
}

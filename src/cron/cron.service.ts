import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JWT_REFRESH_SECRET } from 'src/constants/environment';
import { postLifeTime } from 'src/constants/permanent';
import { PostService } from 'src/post/post.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class CronService {
  constructor(
    private readonly postService: PostService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async hardDeleteSoftDeletedPosts(): Promise<void> {
    const softDeletedPosts = await this.postService.findDeletePost();
    if (softDeletedPosts.length > 0) {
      const currentDate = new Date();
      const promises = softDeletedPosts.map((item) => {
        const timeDifference = currentDate.getTime() - item.deletedAt.getTime();
        if (timeDifference > postLifeTime) {
            return this.postService.deleteSoftPost(item)
        }
          })
        await Promise.all(promises)
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async cehckAndRomoveInvalidToken(): Promise<void> {
    const tokens = await this.tokenService.getTokens();
    const batchSize = 10;
    const totalTokens = tokens.length;
    for (let i = 0; i < totalTokens; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);

      await Promise.all(batchTokens.map(async (token) => {
        try {
          return this.jwtService.verify(token.token, {
            secret: JWT_REFRESH_SECRET,
          });
        } catch (err) {
          await this.tokenService.deleteRefreshToken(token.token);
        }
      }))
    }
  }
}



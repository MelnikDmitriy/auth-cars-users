import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PostModule } from 'src/post/post.module';
import { TokenModule } from 'src/token/token.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostModule, TokenModule],
  providers: [CronService, JwtService],
})
export class CronModule {}

import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/orm.config';
import { UserModule } from './user/user.module';
import { CredentialsModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { CarModule } from './car/car.module';
import { PostModule } from './post/post.module';
import { MinioClientModule } from './minio/minio.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LikeModule } from './like/like.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ThrottlerModule.forRoot([
      {
        ttl: 300000, 
        limit: 10,
      },
    ]),
    UserModule,
    CredentialsModule,
    AuthModule,
    TokenModule, 
    CarModule,
    PostModule,
    MinioClientModule,
    ImageUploadModule,
    CronModule,
    LikeModule,
    ScheduleModule.forRoot(),  
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
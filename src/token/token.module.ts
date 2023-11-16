import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/tokens.entity';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [TokenService, TokenRepository, JwtService],
  exports: [TokenService],
})
export class TokenModule {}

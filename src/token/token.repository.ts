import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/tokens.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

export class TokenRepository {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  saveUserToken(token: string, user: UserEntity): Promise<TokenEntity> {
    try {
      return this.tokenRepository.save({ token, user });
    } catch (err) {
      throw new InternalServerErrorException('');
    }
  }

  async refreshToken(tokenId: string, refreshToken: string): Promise<void> {
    try {
      await this.tokenRepository.update(
        { id: tokenId },
        { token: refreshToken },
      );
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async checkRefreshToken(token: string): Promise<TokenEntity> {
    try {
      const tokenRecord = await this.tokenRepository.findOne({
        where: { token },
      });
      if (!tokenRecord) {
        throw new UnauthorizedException('Токен не найден');
      }
      return tokenRecord;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteTokenRecord(token: string): Promise<void> {
    try {
      await this.tokenRepository
        .createQueryBuilder('token')
        .delete()
        .from(TokenEntity)
        .where('token = :token', { token })
        .execute();

      return;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async checkExistToken(userId: string): Promise<TokenEntity> {
    try {
      const checkedExistToken = await this.tokenRepository.findOne({
        where: { user: { id: userId } },
      });
      return checkedExistToken;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getTokens(): Promise<TokenEntity[]> {
    try {
      return await this.tokenRepository.find();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}

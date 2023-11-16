import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './token.repository';
import { UserEntity } from 'src/entities/users.entity';
import { GeneratedTokens } from './interface/generated-tokens.interface';
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from 'src/constants/environment';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from 'src/constants/permanent';
import { FullCredentials } from 'src/credential/interfaces/full-credentials.interface';
import { TokenEntity } from 'src/entities/tokens.entity';
import { InfoAndTokens } from 'src/auth/interface/info-tokens.interface';
import { ValidateToken } from './interface/validate-token.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  generatedTokens(payload: UserEntity): GeneratedTokens {
    const accessToken = this.jwtService.sign(
      { payload },
      {
        secret: JWT_ACCESS_SECRET,
        expiresIn: accessTokenLifeTime,
      },
    );
    const refreshToken = this.jwtService.sign(
      { payload },
      {
        secret: JWT_REFRESH_SECRET,
        expiresIn: refreshTokenLifeTime,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  saveToken(
    credentialsResult: FullCredentials,
    token: string,
  ): Promise<TokenEntity> {
    return this.tokenRepository.saveUserToken(token, credentialsResult.user);
  }

  async deleteRefreshToken(token: string): Promise<void> {
    const tokenRecord = await this.tokenRepository.checkRefreshToken(token);
    await this.tokenRepository.deleteTokenRecord(tokenRecord.token);
  }

  async refresh(token: string): Promise<InfoAndTokens> {
    const { payload } = await this.validateRefreshToken(token);
    const tokenRecord = await this.tokenRepository.checkRefreshToken(token);
    await this.deleteRefreshToken(tokenRecord.token);
    const generatedTokens = await this.generatedTokens(payload);
    await this.tokenRepository.saveUserToken(
      generatedTokens.refreshToken,
      payload,
    );

    return { userInfo: payload, tokens: generatedTokens };
  }

  validateRefreshToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_ACCESS_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }

  validateAcessToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_ACCESS_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }

  checkExistToken(userId: string): Promise<void> {
    return this.tokenRepository.checkExistToken(userId);
  }
}

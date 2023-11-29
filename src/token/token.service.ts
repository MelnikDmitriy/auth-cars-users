import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  saveToken(userInfo: UserEntity, token: string): Promise<TokenEntity> {
    return this.tokenRepository.saveUserToken(token, userInfo);
  }

  async deleteRefreshToken(token: string): Promise<void> {
    const tokenRecord = await this.tokenRepository.checkRefreshToken(token);
    await this.tokenRepository.deleteTokenRecord(tokenRecord.token);
  }

  async refresh(token: string, userInfo: UserEntity): Promise<InfoAndTokens> {
    const generatedTokens = await this.generatedTokens(userInfo);
    try {
      await this.validateRefreshToken(token);
      await this.saveToken(userInfo, generatedTokens.refreshToken);

      return { userInfo, tokens: generatedTokens };
    } catch (err) {
      await this.deleteRefreshToken(token);
      await this.saveToken(userInfo, generatedTokens.refreshToken);
      return { userInfo, tokens: generatedTokens };
    }
  }

  validateRefreshToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }

  validateAccessToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_ACCESS_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }

  async checkExistToken(userId: string): Promise<TokenEntity> {
    return this.tokenRepository.checkExistToken(userId);
  }

  async refreshToken(token: string): Promise<InfoAndTokens> {
    const { payload } = await this.validateRefreshToken(token);
    await this.tokenRepository.checkRefreshToken(token);
    await this.deleteRefreshToken(token);
    const generatedTokens = await this.generatedTokens(payload);
    await this.saveToken(payload, generatedTokens.refreshToken);
    return { userInfo: payload, tokens: generatedTokens };
  }

  async getTokens(): Promise<TokenEntity[]> {
    return this.tokenRepository.getTokens();
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsService } from 'src/credential/credential.service';
import { TokenService } from 'src/token/token.service';
import { AuthDto } from './dto/auth.dto';
import { InfoAndTokens } from './interface/info-tokens.interface';
import { FullCredentials } from 'src/credential/interfaces/full-credentials.interface';
import * as bcypt from 'bcrypt';
import { UserEntity } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
    constructor (
        private readonly tokenService:TokenService,
        private readonly credentialsService: CredentialsService
        ) {}

    async login(authDto: AuthDto): Promise<InfoAndTokens> {
        const credentialsResult = await this.checkUserCredentials(authDto);
        const userInfo = credentialsResult.user;
        const checkExistToken = await this.tokenService.checkExistToken(userInfo.id)
        const generatedTokens = this.tokenService.generatedTokens(userInfo);

        await this.tokenService.saveToken(
            credentialsResult,
            generatedTokens.refreshToken
        );

        return { userInfo, tokens: generatedTokens }
    }

    async checkUserCredentials(authDto: AuthDto): Promise<FullCredentials> {
        const credentials = await this.credentialsService.checkLoginExistance(authDto.login);
        
        const passwordIsEqual = await bcypt.compare(
            authDto.password,
            credentials.password
        );

        if (!passwordIsEqual) {
            throw new UnauthorizedException({message: 'Некоректный пароль'});
        }

        return credentials;
    }

    async logout(token: string): Promise<void> {
        return this.tokenService.deleteRefreshToken(token);
    }

    refresh(token: string): Promise<InfoAndTokens> {
        return this.tokenService.refresh(token);
    }

    async checkAuth(accessToken: string): Promise<UserEntity> {
        const { payload } = await this.tokenService.validateAcessToken(accessToken);
        return payload;
    }

}

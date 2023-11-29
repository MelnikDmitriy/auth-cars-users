import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { InfoAndTokens } from './interface/info-tokens.interface';
import { maxAge } from 'src/constants/permanent';
import { UserEntity } from 'src/entities/users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: AuthDto,
  ): Promise<InfoAndTokens> {
    const accountUserAndTokens = await this.authService.login(authDto);
    response.cookie('accessToken', accountUserAndTokens.tokens.accessToken, {
      maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    response.cookie('refreshToken', accountUserAndTokens.tokens.refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return accountUserAndTokens;
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const token = request.cookies.refreshToken;
    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');

    return this.authService.logout(token);
  }

  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<InfoAndTokens> {
    const token = request.cookies.refreshToken;
    const userInfoAndTokens = await this.authService.refresh(token);
    response.cookie('accessToken', userInfoAndTokens.tokens.accessToken, {
      maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    response.cookie('refreshToken', userInfoAndTokens.tokens.refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return userInfoAndTokens;
  }

  @Get('/check-auth')
  checkAuth(@Req() request: Request): Promise<UserEntity> {
    const { accessToken } = request.cookies;
    return this.authService.checkAuth(accessToken);
  }
}

/*
  const clickedButton = () => {
    try {
      const messages = await axios.get('localhost:3000/messsages', cridentials: true)  (credentials  с фронта кидают с запросом куку)
      showUser(messages)
    } catch (err) {
      try {
        if (err.code === 401) {
          await axios.post('refresh', cridentials: true)
          const messages = await axios.get('localhost:3000/messsages', cridentials: true)
          showUser(messages)
      } catch (err) {
        showUserError(Авторизуйтесь)
      }
    }
      
    }
  }
*/

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const { accessToken } = req.cookies;

      if (!accessToken) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован/',
        });
      }

      const status = await this.tokenService.validateAccessToken(accessToken);
      if (status) {
        return true;
      } else {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован/',
        });
      }
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован/',
      });
    }
  }
}

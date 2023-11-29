import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/constants/permanent';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const { accessToken } = req.cookies;

      const account = this.tokenService.validateAccessToken(accessToken);
      req.account = account;
      const status = requiredRoles.some(
        (roles) => roles === account.payload.role,
      );

      if (status) {
        return status;
      } else {
        throw new HttpException(
          'Пользователь не имеет доступа',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (err) {
      throw new HttpException(
        'Пользователь не имеет доступа',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

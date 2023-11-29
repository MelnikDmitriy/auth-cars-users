import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const CheckUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const paramUserId = request.params.id;
    const user = request.account.payload;
    if (paramUserId == user.id) {
      return paramUserId;
    } else {
      throw new BadRequestException('Id не совпадают');
    }
  },
);

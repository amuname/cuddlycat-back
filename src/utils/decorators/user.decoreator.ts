import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserNoHash } from 'src/dto/user_no_hash';

export const UserAfterAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserNoHash;
  },
);

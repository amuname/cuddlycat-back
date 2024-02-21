import { Controller, Get, Param, ParseUUIDPipe, Req } from '@nestjs/common';
import { SsoRedirectService } from './sso-redirect.service';
import { Request } from 'express';

@Controller()
export class SsoRedirectController {
  constructor(private ssoRedirectService: SsoRedirectService) {}

  @Get('sso-redirect/:user_uuid')
  authUser(
    @Req() req: Request,
    @Param('user_uuid', new ParseUUIDPipe()) user_uuid: string,
  ) {
    return this.ssoRedirectService.authUserJWT(
      user_uuid,
      req.headers['x-forwarded-host'] as string,
    );
  }
}

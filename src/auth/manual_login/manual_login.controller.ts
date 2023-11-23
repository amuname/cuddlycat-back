import {
  Body,
  Controller,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ManualLoginService } from './manual_login.service';
import { SignInData } from 'src/dto/login_data';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Request } from 'express';
import { UserNoHash } from 'src/dto/user_no_hash';
import { SsoRedirectService } from '../sso-redirect/sso-redirect.service';

@Controller('manual-login')
export class ManualLoginController {
  constructor(
    private readonly manualLoginService: ManualLoginService,
    private readonly ssoRedirectService: SsoRedirectService,
  ) {}

  // @HttpStatus(HttpStatus.CREATED)
  @Post('sign-in')
  signIn(@Body() data: SignInData) {
    return this.manualLoginService.signIn(data);
  }

  @UseGuards(LocalAuthGuard)
  @Redirect()
  @Post('log-in')
  async logIn(
    @Req() req: Request & { user: UserNoHash },
    // @Res() res: Response,
  ) {
    // console.log('\nreq\n', req, '\n');
    // return req.user;
    // return this.manualLoginService.login(req.user);
    const jwt_payload = await this.manualLoginService.login(req.user);
    console.log('\nreq.hostname\n', req.hostname, '\n');
    return this.ssoRedirectService.createUUIDPath(
      req.hostname,
      req.user,
      jwt_payload.access_token,
    );
    // const redirect = this.ssoRedirectService.createUUIDPath(
    //   req.hostname,
    //   req.user,
    //   jwt_payload.access_token,
    // );
    // console.log('\nres\n', res, '\n');
    // return res.redirect(redirect.statusCode, redirect.url);
  }
}

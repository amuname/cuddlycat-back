import {
  HttpRedirectResponse,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { User } from '@prisma/client';
import { UserNoHash } from 'src/dto/user_no_hash';
import { v4 as uuidv4 } from 'uuid';

export const SUBDOMIAN = 'app';
export const AUTH_USER_JWT_PATH = 'sso-redirect';

@Injectable()
export class SsoRedirectService {
  // TODO позже станет редиской
  private usersUUIDS = new Map<
    string,
    { user: UserNoHash; jwt_token: string }
  >();

  createUUIDPath(
    domain: string,
    user: UserNoHash,
    jwt_token: string,
  ): HttpRedirectResponse {
    const redirect_uuid = uuidv4();
    this.usersUUIDS.set(redirect_uuid, { user, jwt_token });
    console.log('DOMAIN ', domain);
    const redirect_path =
      process.env.NODE_ENV == 'PRODUCTION'
        ? `https://${SUBDOMIAN}.${domain}/${AUTH_USER_JWT_PATH}/${redirect_uuid}`
        : `http://${domain}:3000/${AUTH_USER_JWT_PATH}/${redirect_uuid}`;

    return { url: redirect_path, statusCode: 302 };
    // return HttpRedirectResponse
  }

  async authUserJWT(user_uuid: string, domain: string) {
    const user_data = this.usersUUIDS.get(user_uuid);
    if (!user_data) throw new UnauthorizedException();
    return this.createHTMLDocument(user_data.jwt_token, domain);
  }

  createHTMLDocument(jwt_token: string, domain: string) {
    const url =
      process.env.NODE_ENV == 'PRODUCTION'
        ? '    window.location.replace("https://'
            .concat(SUBDOMIAN + '.')
            .concat(domain + '/lk')
            .concat('")\n')
        : '    window.location.replace("http://'
            .concat(domain + ':3000/lk')
            .concat('")\n');
    return (
      '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '  <title>Cuddly Redirect</title>\n' +
      '</head>\n' +
      '<body>\n' +
      '  <script>\n' +
      '    window.localStorage.setItem("jwt", "'
        .concat(jwt_token)
        .concat('")\n') +
      url +
      '  </script>\n' +
      '</body>\n' +
      '</html>\n'
    );
  }
}

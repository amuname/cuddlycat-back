import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ManualLoginService } from 'src/auth/manual_login/manual_login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private manualLoginService: ManualLoginService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('username', email, 'password', password);
    const user = await this.manualLoginService.validateUser({
      email,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

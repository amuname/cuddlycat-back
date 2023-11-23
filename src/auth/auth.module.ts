import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { ManualLoginService } from 'src/auth/manual_login/manual_login.service';
import { ManualLoginController } from './manual_login/manual_login.controller';
import { HashService } from './hash_service/hash_service.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SsoRedirectService } from './sso-redirect/sso-redirect.service';
import { SsoRedirectController } from './sso-redirect/sso-redirect.controller';

// import {  } from './hash_service/hash_service.service';

// console.log('\nJWT MODULE\n', JwtModule, '\n');
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ManualLoginController, SsoRedirectController],
  providers: [
    ManualLoginService,
    LocalStrategy,
    HashService,
    PrismaService,
    SsoRedirectService,
  ],
  exports: [ManualLoginService],
})
export class AuthModule {}

// console.log('\nAuthModule\n', AuthModule, '\n');

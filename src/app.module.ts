import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ManualLoginService } from './auth/manual_login/manual_login.service';
// import { ManualLoginController } from './auth/manual_login/manual_login.controller';
// import { HashService } from './hash_service/hash_service.service';
import { PrismaService } from './prisma/prisma.service';
// import { SsoRedirectService } from './auth/sso-redirect/sso-redirect.service';
// import { SsoRedirectController } from './auth/sso-redirect/sso-redirect.controller';
import { AuthModule } from './auth/auth.module';
// import { LkController } from './lk/lk.controller';
// import { LkService } from './lk/lk.service';
// import { ApiProxyController } from './api-proxy/api-proxy.controller';
import { AdminModule } from './admin/admin.module';
import { LkModule } from './lk/lk.module';
console.log('\n APP MODULE AuthModule\n', AuthModule, '\n');
@Module({
  imports: [AuthModule, AdminModule, LkModule],
  controllers: [
    AppController,
    // LkController,
    // ApiProxyController,
    // ManualLoginController,
    // SsoRedirectController,
  ],
  providers: [
    PrismaService,
    AppService,
    // ManualLoginService,
    // HashService,
    PrismaService,
    // SsoRedirectService,
  ],
})
export class AppModule {}

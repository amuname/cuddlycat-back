import { Module } from '@nestjs/common';
import { LkBonuceController } from './bonus/lk-bonus.controller';
import { LkBonuceService } from './bonus/lk-bonus.service';
import { LkCompanyController } from './company/lk-companies.controller';
import { LkCompanyService } from './company/lk-companies.service';
import { LkProductController } from './product/lk-product.controller';
import { LkProductService } from './product/lk-product.service';
import { LkUserController } from './user/lk-user.controller';
import { LkUserService } from './user/lk-user.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [AuthModule],
  controllers: [
    LkBonuceController,
    LkCompanyController,
    LkProductController,
    LkUserController,
  ],
  providers: [
    LkBonuceService,
    LkCompanyService,
    LkProductService,
    LkUserService,
    PrismaService,
  ],
})
export class LkModule {}

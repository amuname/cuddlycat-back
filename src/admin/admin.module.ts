import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { LkBonuceController } from './bonus/admin-bonus.controller';
import { LkBonuceService } from './bonus/admin-bonus.service';
import { LkCompanyController } from './company/admin-companies.controller';
import { LkCompanyService } from './company/admin-companies.service';
import { LkProductController } from './product/admin-product.controller';
import { LkProductService } from './product/admin-product.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdminService } from './admin.service';
// import { AuthModule } from 'src/auth/auth.module';
// import { LkUserController } from './user/lk-user.controller';
// import { LkUserService } from './user/lk-user.service';

@Module({
  // imports: [AuthModule],
  controllers: [
    AdminController,
    LkBonuceController,
    LkCompanyController,
    LkProductController,
    // LkUserController,
  ],
  providers: [
    AdminService,
    LkBonuceService,
    LkCompanyService,
    LkProductService,
    PrismaService,
    // LkUserService,
  ],
})
export class AdminModule {}

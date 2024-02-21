import { Controller, Get, UseGuards } from '@nestjs/common';
import { LkUserService } from './lk-user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserNoHash } from '../../dto/user_no_hash';
import { UserAfterAuth } from 'src/utils/decorators/user.decoreator';

@Controller('lk/user')
export class LkUserController {
  constructor(private lkUserService: LkUserService) {}

  // @Get()
  // lk() {
  //   return 'Hello lk!';
  // }

  @UseGuards(JwtAuthGuard)
  @Get('getMe')
  getMe(@UserAfterAuth() user: UserNoHash) {
    return this.lkUserService.getMe(user);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { LkBonuceService } from './admin-bonus.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserAfterAuth } from '../../utils/decorators/user.decoreator';
import { UserNoHash } from '../../dto/user_no_hash';

@Controller('lk/bonus')
export class LkBonuceController {
  constructor(private lkBonuceService: LkBonuceService) {}

  // @Get()
  // lk() {
  //   return 'Hello lk!';
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('getBonucesByUserId/:id')
  // getBonucesByUserId(@Param('id') userId: string) {
  //   return this.lkBonuceService.getBonucesByUserId(userId);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('getUserBonuces')
  getUserBonuces(@UserAfterAuth() user: UserNoHash) {
    return this.lkBonuceService.getUserBonuces(user);
  }
}

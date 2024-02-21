import {
  Controller,
  Get,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
  // Req,
  UseGuards,
} from '@nestjs/common';
import { LkProductService } from './lk-product.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
// import { UserNoHash } from '../../dto/user_no_hash';
import { ProviderCompanyType } from '@prisma/client';

@Controller('lk/product')
export class LkProductController {
  constructor(private lkProductService: LkProductService) {}

  // @Get()
  // lk() {
  //   return 'Hello lk!';
  // }

  @UseGuards(JwtAuthGuard)
  @Get('getList')
  getList(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('type', new ParseEnumPipe(ProviderCompanyType))
    type: ProviderCompanyType,
  ) {
    return this.lkProductService.getList(offset, limit, type);
  }
}

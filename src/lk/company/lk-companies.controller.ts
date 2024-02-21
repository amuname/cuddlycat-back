import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
  // Req,
  UseGuards,
} from '@nestjs/common';
import { LkCompanyService } from './lk-companies.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
// import { UserNoHash } from '../../dto/user_no_hash';
import { ProviderCompanyType } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('lk/company')
export class LkCompanyController {
  constructor(private lkCompanyService: LkCompanyService) {}

  // @Get()
  // lk() {
  //   return 'Hello lk!';
  // }

  @Get('getList')
  getList(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('type', new ParseEnumPipe(ProviderCompanyType))
    type: ProviderCompanyType,
  ) {
    return this.lkCompanyService.getList(offset, limit, type);
  }

  @Get('getCompanyProductsById/:id')
  getCompanyProductsById(
    @Param('id') id: string,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    // @Query('type', new ParseEnumPipe(ProviderCompanyType))
    // type: ProviderCompanyType,
  ) {
    return this.lkCompanyService.getCompanyProducts(id, offset, limit);
  }
}

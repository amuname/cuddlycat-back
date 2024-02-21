import {
  Body,
  Controller,
  // Get,
  // ParseEnumPipe,
  // ParseIntPipe,
  Post,
  // Query,
  // Req,
  UseGuards,
} from '@nestjs/common';
import { LkProductService } from './admin-product.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
// import { UserNoHash } from '../../dto/user_no_hash';
// import { ProviderCompanyType, ProviderProduct } from '@prisma/client';
import { RolesGuard } from '../../auth/roles.guard';
import { ProviderProductConfigCreate } from '../../dto/provider_product_config_create';
import { ProviderProductCreate } from '../../dto/provider_product_create';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('lk/product')
export class LkProductController {
  constructor(private lkProductService: LkProductService) {}

  // @Get()
  // lk() {
  //   return 'Hello lk!';
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('getList')
  // getList(
  //   @Query('offset', ParseIntPipe) offset: number,
  //   @Query('limit', ParseIntPipe) limit: number,
  //   @Query('type', new ParseEnumPipe(ProviderCompanyType))
  //   type: ProviderCompanyType,
  // ) {
  //   return this.lkProductService.getList(offset, limit, type);
  // }

  @Post('')
  createProduct(
    @Body('product') productDto: ProviderProductCreate,
    @Body('company_id') companyId: string,
    @Body('product_config') productConfig: ProviderProductConfigCreate,
  ) {
    return this.lkProductService.createProduct(
      productDto,
      companyId,
      productConfig,
    );
  }
}

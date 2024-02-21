import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { UserNoHash } from '../../dto/user_no_hash';
// import {
//   ProviderCompanyType,
//   ProviderProduct,
//   ProviderProductInputFieldsConfig,
// } from '@prisma/client';
import { ProviderProductCreate } from '../../dto/provider_product_create';
import { ProviderProductConfigCreate } from '../../dto/provider_product_config_create';

@Injectable()
export class LkProductService {
  constructor(private prismaService: PrismaService) {}

  // async getList(offset = 0, limit = 10, type?: ProviderCompanyType) {
  //   return this.prismaService.providerProduct.findMany({
  //     where: {
  //       type,
  //     },
  //     skip: offset,
  //     take: limit,
  //   });
  // }

  createProduct(
    productDto: ProviderProductCreate,
    companyId: string,
    productConfig: ProviderProductConfigCreate,
  ) {
    return this.prismaService.providerProduct.create({
      data: {
        ...productDto,
        provider_company: {
          connect: {
            id: companyId,
          },
        },
        provider_product_input_fields_config: {
          create: {
            ...productConfig,
            provider_product_input_fields_config_questions: {
              connect: {
                id: 1,
              },
            },
          },
        },
      },
    });
  }
}

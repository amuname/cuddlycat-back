import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { UserNoHash } from '../../dto/user_no_hash';
import { ProviderCompanyType } from '@prisma/client';
import { ProviderCompanyCreate } from '../../dto/provider_company_create';

@Injectable()
export class LkCompanyService {
  constructor(private prismaService: PrismaService) {}

  async getList(offset = 0, limit = 10, type?: ProviderCompanyType) {
    return this.prismaService.providerCompany.findMany({
      where: {
        type,
      },
      skip: offset,
      take: limit,
    });
  }

  // getCompanyProducts(id: string, offset = 0, limit = 10) {
  //   return this.prismaService.providerCompany.findMany({
  //     where: {
  //       id,
  //     },
  //     skip: offset,
  //     take: limit,
  //     include: {
  //       products: true,
  //     },
  //   });
  // }

  async createProduct(companyDto: ProviderCompanyCreate) {
    return this.prismaService.providerCompany.create({
      data: {
        ...companyDto,
      },
    });
  }
}

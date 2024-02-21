import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { UserNoHash } from '../../dto/user_no_hash';
import { ProviderCompanyType } from '@prisma/client';

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

  getCompanyProducts(id: string, offset = 0, limit = 10) {
    return this.prismaService.providerCompany.findMany({
      where: {
        id,
      },
      skip: offset,
      take: limit,
      include: {
        products: true,
      },
    });
  }
}

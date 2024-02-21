import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { UserNoHash } from '../../dto/user_no_hash';
import { ProviderCompanyType } from '@prisma/client';

@Injectable()
export class LkProductService {
  constructor(private prismaService: PrismaService) {}

  async getList(offset = 0, limit = 10, type?: ProviderCompanyType) {
    return this.prismaService.providerProduct.findMany({
      where: {
        type,
      },
      skip: offset,
      take: limit,
    });
  }
}

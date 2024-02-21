import { Injectable } from '@nestjs/common';
import { UserNoHash } from '../../dto/user_no_hash';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LkBonuceService {
  constructor(private prismaService: PrismaService) {}

  // async getBonucesByUserId(userId: string) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       bonus_programm: true,
  //     },
  //   });

  //   return user.bonus_programm;
  // }

  async getUserBonuces(user: UserNoHash) {
    const userDb = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        bonus_programm: true,
      },
    });

    return userDb.bonus_programm;
  }
}

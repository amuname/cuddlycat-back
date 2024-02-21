import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNoHash } from '../../dto/user_no_hash';

@Injectable()
export class LkUserService {
  constructor(private prismaService: PrismaService) {}

  async getMe(user: UserNoHash) {
    return user;
  }
}

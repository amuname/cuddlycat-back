import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInData, SignInData } from 'src/dto/login_data';
import { UserNoHash } from 'src/dto/user_no_hash';
import { HashService } from 'src/auth/hash_service/hash_service.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { userToUserNoHash } from 'src/utils/user_to_user_no_hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManualLoginService {
  constructor(
    private hashService: HashService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signIn({ email, phone, password }: SignInData) {
    const hash = await this.hashService.hashGenerate(password);

    await this.prismaService.user.create({
      data: {
        email,
        phone,
        hash,
      },
    });
  }

  async validateUser({ email, password }: LogInData) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    const is_password_correct = await this.hashService.hashSourceCompare(
      password,
      user.hash,
    );

    if (!is_password_correct) throw new UnauthorizedException();

    // delete user.hash;
    return userToUserNoHash(user);
  }

  async login(user: UserNoHash) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

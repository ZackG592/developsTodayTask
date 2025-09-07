import { Injectable, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signIn(name: string) {
    const user = this.prismaService.user.findUnique({ where: { name } });
    return user;
  }

  async signUp(name: string) {
    return this.prismaService.user.create({ data: { name } });
  }
}

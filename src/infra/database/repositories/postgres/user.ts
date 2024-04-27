import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../user';
import { CreateUserInput } from '~/infra/types/user/payload';
import { User } from '~/infra/database/entities/user';

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user);
  }

  async create(user: CreateUserInput) {
    await this.prisma.user.create({ data: user });
  }
}

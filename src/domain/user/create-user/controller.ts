import { PostgresUserRepository } from '~/infra/database/repositories/postgres/user';
import { CreateUserUseCase } from './use-case';
import { prisma } from '~/infra/config/database';

export class CreateUserController {
  static create() {
    const repo = new PostgresUserRepository(prisma);
    return new CreateUserUseCase(repo);
  }
}

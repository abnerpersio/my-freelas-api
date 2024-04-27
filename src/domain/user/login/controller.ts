import { PostgresUserRepository } from '~/infra/database/repositories/postgres/user';
import { LoginUseCase } from './use-case';
import { prisma } from '~/infra/config/database';

export class LoginController {
  static create() {
    const repo = new PostgresUserRepository(prisma);
    return new LoginUseCase(repo);
  }
}

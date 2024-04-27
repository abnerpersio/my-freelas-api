import { prisma } from '~/infra/config/database';
import { PostgresUserRepository } from '~/infra/database/repositories/postgres/user';
import { MeUseCase } from './use-case';

export class MeController {
  static create() {
    const repo = new PostgresUserRepository(prisma);
    return new MeUseCase(repo);
  }
}

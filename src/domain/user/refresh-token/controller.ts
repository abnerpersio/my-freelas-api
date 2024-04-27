import { prisma } from '~/infra/config/database';
import { PostgresUserRepository } from '~/infra/database/repositories/postgres/user';
import { RefreshTokenUseCase } from './use-case';

export class RefreshTokenController {
  static create() {
    const repo = new PostgresUserRepository(prisma);
    return new RefreshTokenUseCase(repo);
  }
}

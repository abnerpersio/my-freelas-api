import { prisma } from '~/infra/config/database';
import { CreateTransactionUseCase } from './use-case';
import { PostgresTransactionRepository } from '~/infra/database/repositories/postgres/transaction';

export class CreateTransactionController {
  static create() {
    const repo = new PostgresTransactionRepository(prisma);
    return new CreateTransactionUseCase(repo);
  }
}

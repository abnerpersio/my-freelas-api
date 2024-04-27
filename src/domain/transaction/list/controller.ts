import { prisma } from '~/infra/config/database';
import { PostgresTransactionRepository } from '~/infra/database/repositories/postgres/transaction';
import { ListTransactionUseCase } from './use-case';

export class ListTransactionController {
  static create() {
    const repo = new PostgresTransactionRepository(prisma);
    return new ListTransactionUseCase(repo);
  }
}

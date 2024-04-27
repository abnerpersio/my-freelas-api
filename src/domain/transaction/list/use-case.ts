import { TransactionRepository } from '~/infra/database/repositories/transaction';
import { Context, UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class ListTransactionUseCase implements UseCase {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(_: Record<string, unknown>, context: Context) {
    const userId = context.user.id;
    const result = this.repository.list(userId);
    return CreateResponse.ok(result);
  }
}

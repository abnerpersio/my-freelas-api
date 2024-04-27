import { TransactionRepository } from '~/infra/database/repositories/transaction';
import { Context, UseCase } from '~/infra/http/base';
import { CreateTransactionInput } from '~/infra/types/transactions/payload';
import { CreateResponse } from '~/shared/utils/create-response';

export class CreateTransactionUseCase implements UseCase {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(input: CreateTransactionInput, context: Context) {
    const userId = context.user.id;
    await this.repository.create(userId, input);
    return CreateResponse.created();
  }
}

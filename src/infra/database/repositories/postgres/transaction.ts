import { PrismaClient } from '@prisma/client';
import { Transaction } from '~/infra/database/entities/transaction';
import { TransactionRepository } from '../transaction';
import { CreateTransactionInput, UpdateTransactionInput } from '~/infra/types/transactions/payload';

export class PostgresTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(userId: string) {
    const transaction = await this.prisma.transaction.findMany({ where: { user_id: userId } });
    return transaction.map((transaction) => new Transaction(transaction));
  }

  async findById(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({ where: { user_id: userId, id } });
    if (!transaction) return null;
    return new Transaction(transaction);
  }

  async create(userId: string, input: CreateTransactionInput) {
    await this.prisma.transaction.create({ data: { ...input, user_id: userId } });
  }

  async update(userId: string, id: string, input: UpdateTransactionInput) {
    await this.prisma.transaction.update({
      where: { id, user_id: userId },
      data: input,
    });
  }
}

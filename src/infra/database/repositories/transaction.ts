import { Transaction } from '~/infra/database/entities/transaction';

export interface TransactionRepository {
  list: () => Promise<Transaction[]>;
  findById: (id: string) => Promise<Transaction | null>;
  create: (transaction: Transaction) => Promise<void>;
  update: (transaction: Transaction) => Promise<void>;
}

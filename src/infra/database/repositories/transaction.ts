import { Transaction } from '~/infra/database/entities/transaction';
import {
  CreateTransactionInput,
  TransactionFilters,
  UpdateTransactionInput,
} from '~/infra/types/transactions/payload';

export interface TransactionRepository {
  list: (userId: string, filters?: TransactionFilters) => Promise<Transaction[]>;
  findById: (userId: string, id: string) => Promise<Transaction | null>;
  create: (transaction: CreateTransactionInput) => Promise<void>;
  update: (transaction: UpdateTransactionInput) => Promise<void>;
}

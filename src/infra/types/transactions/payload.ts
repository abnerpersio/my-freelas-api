import { TransactionStatus } from '@prisma/client';

export type TransactionFilters = {
  createdAtStart?: string;
  createdAtEnd?: string;
};

export type CreateTransactionInput = {
  id: string;
  status: TransactionStatus;
  created_at: Date;
  user_id: string;
};

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

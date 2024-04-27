import {
  User as PrismaUser,
  Timesheet as PrismaTimesheet,
  Transaction as PrismaTransaction,
  TransactionStatus,
} from '@prisma/client';
import { Timesheet } from './timesheet';
import { User } from './user';

type Input = PrismaTransaction & {
  user?: PrismaUser;
  timesheets?: PrismaTimesheet[];
};

export class Transaction {
  id: string;
  status: TransactionStatus;
  created_at: Date;

  user: User | null;
  timesheets: Timesheet[];

  constructor(input: Input) {
    this.id = input.id;
    this.status = input.status;
    this.created_at = input.created_at;

    this.user = input.user ? new User(input.user) : null;
    this.timesheets = (input.timesheets || []).map((timesheet) => new Timesheet(timesheet));
  }
}

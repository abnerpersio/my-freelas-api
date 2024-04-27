import {
  User as PrismaUser,
  Project as PrismaProject,
  Timesheet as PrismaTimesheet,
  Transaction as PrismaTransaction,
} from '@prisma/client';
import { Timesheet } from './timesheet';
import { User } from './user';
import { Transaction } from './transaction';

type Input = PrismaProject & {
  user?: PrismaUser;
  timesheets?: PrismaTimesheet[];
  transaction?: PrismaTransaction;
};

export class Project {
  id: string;
  name: string;
  description: string | null;

  user: User | null;
  timesheets: Timesheet[];
  transaction: Transaction | null;

  constructor(input: Input) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description || null;

    this.user = input.user ? new User(input.user) : null;
    this.transaction = input.transaction ? new Transaction(input.transaction) : null;
    this.timesheets = (input.timesheets || []).map((timesheet) => new Timesheet(timesheet));
  }
}

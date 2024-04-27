import {
  User as PrismaUser,
  Project as PrismaProject,
  Transaction as PrismaTransaction,
  TransactionStatus,
} from '@prisma/client';
import { User } from './user';
import { Project } from './project';

type Input = PrismaTransaction & {
  user?: PrismaUser;
  projects?: PrismaProject[];
};

export class Transaction {
  id: string;
  status: TransactionStatus;
  created_at: Date;

  user: User | null;
  projects: Project[];

  constructor(input: Input) {
    this.id = input.id;
    this.status = input.status;
    this.created_at = input.created_at;

    this.user = input.user ? new User(input.user) : null;
    this.projects = (input.projects || []).map((project) => new Project(project));
  }
}

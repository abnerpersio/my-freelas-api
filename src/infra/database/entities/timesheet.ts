import { User } from './user';
import { User as PrismaUser, Timesheet as PrismaTimesheet } from '@prisma/client';

type Input = PrismaTimesheet & {
  user?: PrismaUser;
};

export class Timesheet {
  id: string;
  start: Date;
  end: Date;
  duration: number;
  description: string | null;
  created_at: Date;

  user: User | null;

  constructor(input: Input) {
    this.id = input.id;
    this.start = input.start;
    this.end = input.end;
    this.duration = input.duration;
    this.description = input.description;
    this.created_at = input.created_at;

    this.user = input.user ? new User(input.user) : null;
  }
}

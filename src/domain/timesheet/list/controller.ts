import { prisma } from '~/infra/config/database';
import { PostgresTimesheetRepository } from '~/infra/database/repositories/postgres/timesheet';
import { ListTimesheetUseCase } from './use-case';

export class ListTimesheetController {
  static create() {
    const repo = new PostgresTimesheetRepository(prisma);
    return new ListTimesheetUseCase(repo);
  }
}

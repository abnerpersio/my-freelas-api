import { prisma } from '~/infra/config/database';
import { CreateTimesheetUseCase } from './use-case';
import { PostgresTimesheetRepository } from '~/infra/database/repositories/postgres/timesheet';

export class CreateTimesheetController {
  static create() {
    const repo = new PostgresTimesheetRepository(prisma);
    return new CreateTimesheetUseCase(repo);
  }
}

import { Timesheet } from '~/infra/database/entities/timesheet';

export interface TimesheetRepository {
  list: () => Promise<Timesheet[]>;
  findById: (id: string) => Promise<Timesheet | null>;
  create: (timesheet: Timesheet) => Promise<void>;
  update: (timesheet: Timesheet) => Promise<void>;
}

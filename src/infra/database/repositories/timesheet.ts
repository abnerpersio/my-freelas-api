import { Timesheet } from '~/infra/database/entities/timesheet';
import {
  CreateTimesheetInput,
  TimesheetFilters,
  UpdateTimesheetInput,
} from '~/infra/types/timesheets/payload';
export interface TimesheetRepository {
  list: (userId: string, filters?: TimesheetFilters) => Promise<Timesheet[]>;
  findById: (userId: string, id: string) => Promise<Timesheet | null>;
  create: (timesheet: CreateTimesheetInput) => Promise<void>;
  update: (timesheet: UpdateTimesheetInput) => Promise<void>;
}

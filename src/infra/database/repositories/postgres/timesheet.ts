import { PrismaClient } from '@prisma/client';
import { TimesheetRepository } from '../timesheet';
import { Timesheet } from '~/infra/database/entities/timesheet';
import { CreateTimesheetInput, UpdateTimesheetInput } from '~/infra/types/timesheets/payload';

export class PostgresTimesheetRepository implements TimesheetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(userId: string) {
    const timesheets = await this.prisma.timesheet.findMany({ where: { user_id: userId } });
    return timesheets.map((timesheet) => new Timesheet(timesheet));
  }

  async findById(userId: string, id: string) {
    const timesheet = await this.prisma.timesheet.findFirst({ where: { user_id: userId, id } });
    if (!timesheet) return null;
    return new Timesheet(timesheet);
  }

  async create(userId: string, input: CreateTimesheetInput) {
    await this.prisma.timesheet.create({ data: { ...input, user_id: userId } });
  }

  async update(userId: string, id: string, input: UpdateTimesheetInput) {
    await this.prisma.timesheet.update({
      where: { id, user_id: userId },
      data: input,
    });
  }
}

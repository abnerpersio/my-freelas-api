import { TimesheetRepository } from '~/infra/database/repositories/timesheet';
import { Context, UseCase } from '~/infra/http/base';
import { CreateTimesheetInput } from '~/infra/types/timesheets/payload';
import { CreateResponse } from '~/shared/utils/create-response';

export class CreateTimesheetUseCase implements UseCase {
  constructor(private readonly repository: TimesheetRepository) {}

  async execute(input: CreateTimesheetInput, context: Context) {
    const userId = context.user.id;
    await this.repository.create(userId, input);
    return CreateResponse.created();
  }
}

import { TimesheetRepository } from '~/infra/database/repositories/timesheet';
import { Context, UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class ListTimesheetUseCase implements UseCase {
  constructor(private readonly repository: TimesheetRepository) {}

  async execute(_: Record<string, unknown>, context: Context) {
    const userId = context.user.id;
    const result = this.repository.list(userId);
    return CreateResponse.ok(result);
  }
}

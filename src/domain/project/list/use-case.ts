import { ProjectRepository } from '~/infra/database/repositories/project';
import { Context, UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class ListProjectUseCase implements UseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(_: Record<string, unknown>, context: Context) {
    const userId = context.user.id;
    const result = this.repository.list(userId);
    return CreateResponse.ok(result);
  }
}

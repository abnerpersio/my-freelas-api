import { ProjectRepository } from '~/infra/database/repositories/project';
import { Context, UseCase } from '~/infra/http/base';
import { CreateProjectInput } from '~/infra/types/project/payload';
import { CreateResponse } from '~/shared/utils/create-response';

export class CreateProjectUseCase implements UseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(input: CreateProjectInput, context: Context) {
    const userId = context.user.id;
    await this.repository.create(userId, input);
    return CreateResponse.created();
  }
}

import { prisma } from '~/infra/config/database';
import { CreateProjectUseCase } from './use-case';
import { PostgresProjectRepository } from '~/infra/database/repositories/postgres/project';

export class CreateProjectController {
  static create() {
    const repo = new PostgresProjectRepository(prisma);
    return new CreateProjectUseCase(repo);
  }
}

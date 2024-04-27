import { prisma } from '~/infra/config/database';
import { ListProjectUseCase } from './use-case';
import { PostgresProjectRepository } from '~/infra/database/repositories/postgres/project';

export class ListProjectController {
  static create() {
    const repo = new PostgresProjectRepository(prisma);
    return new ListProjectUseCase(repo);
  }
}

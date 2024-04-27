import { PrismaClient } from '@prisma/client';
import { ProjectRepository } from '../project';
import { Project } from '~/infra/database/entities/project';
import { CreateProjectInput, UpdateProjectInput } from '~/infra/types/project/payload';

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(userId: string) {
    const projects = await this.prisma.project.findMany({ where: { user_id: userId } });
    return projects.map((project) => new Project(project));
  }

  async findById(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({ where: { user_id: userId, id } });
    if (!project) return null;
    return new Project(project);
  }

  async create(userId: string, input: CreateProjectInput) {
    await this.prisma.project.create({ data: { ...input, user_id: userId } });
  }

  async update(userId: string, id: string, input: UpdateProjectInput) {
    await this.prisma.project.update({
      where: { id, user_id: userId },
      data: input,
    });
  }
}

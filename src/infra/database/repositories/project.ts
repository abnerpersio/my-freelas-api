import {
  CreateProjectInput,
  ProjectFilters,
  UpdateProjectInput,
} from '~/infra/types/project/payload';
import { Project } from '~/infra/database/entities/project';

export interface ProjectRepository {
  list: (userId: string, filters?: ProjectFilters) => Promise<Project[]>;
  findById: (userId: string, id: string) => Promise<Project | null>;
  create: (project: CreateProjectInput) => Promise<void>;
  update: (project: UpdateProjectInput) => Promise<void>;
}

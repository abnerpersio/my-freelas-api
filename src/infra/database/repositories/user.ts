import { User } from '~/infra/database/entities/user';
import { CreateUserInput } from '~/infra/types/user/payload';

export interface UserRepository {
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  create: (user: CreateUserInput) => Promise<void>;
}

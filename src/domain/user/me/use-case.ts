import { UserRepository } from '~/infra/database/repositories/user';
import { Context, UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class MeUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(_: Record<string, unknown>, context: Context) {
    const user = await this.repository.findById(context.user.id);
    if (!user) {
      return CreateResponse.notFound('User not found');
    }

    return CreateResponse.ok(user.meDetails);
  }
}

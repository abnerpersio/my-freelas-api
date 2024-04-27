import { UserRepository } from '~/infra/database/repositories/user';
import { UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';
import { JWT } from '~/shared/utils/jwt';

type Input = {
  token: string;
};

export class RefreshTokenUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input) {
    if (!input.token) {
      return CreateResponse.badRequest('Invalid token');
    }

    const result = JWT.refresh<{ id: string }>(input.token);
    if (!result) {
      return CreateResponse.unauthorized('Invalid token');
    }

    const user = await this.repository.findById(result.payload.id);
    if (!user) {
      return CreateResponse.notFound('User not found');
    }

    return CreateResponse.ok({ token: result.token });
  }
}

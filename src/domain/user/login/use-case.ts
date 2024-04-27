import { UserRepository } from '~/infra/database/repositories/user';
import { UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';
import { Hash } from '~/shared/utils/hash';
import { JWT } from '~/shared/utils/jwt';

type Input = {
  email: string;
  password: string;
};

export class LoginUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input) {
    if (!input.email || !input.password) {
      return CreateResponse.badRequest('Invalid input');
    }

    const user = await this.repository.findByEmail(input.email);

    if (!user) {
      return CreateResponse.notFound('User not found');
    }

    if (!Hash.compare(input.password, user.password)) {
      return CreateResponse.unauthorized('Invalid password');
    }

    const token = JWT.sign({ id: user.id });

    return CreateResponse.ok({ token });
  }
}

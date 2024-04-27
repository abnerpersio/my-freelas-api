import { UserRepository } from '~/infra/database/repositories/user';
import { UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';
import { Hash } from '~/shared/utils/hash';

type Input = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input) {
    if (!input.name || !input.email || !input.password) {
      return CreateResponse.badRequest('Invalid input');
    }

    const userAlreadyExists = await this.repository.findByEmail(input.email);

    if (!!userAlreadyExists) {
      return CreateResponse.conflict('User already exists');
    }

    const user = { ...input, password: Hash.create(input.password) };
    await this.repository.create(user);
    return CreateResponse.created();
  }
}

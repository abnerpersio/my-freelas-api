import { UseCase } from '~/infra/http/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class HealthUseCase implements UseCase {
  constructor() {}

  async execute() {
    return CreateResponse.ok('Everything is ok!');
  }
}

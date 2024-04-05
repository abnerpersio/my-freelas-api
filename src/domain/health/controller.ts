import { HealthUseCase } from '~/domain/health/use-case';

export class HealthController {
  static create() {
    return new HealthUseCase();
  }
}

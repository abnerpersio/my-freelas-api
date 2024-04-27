import { createHash } from 'crypto';

export class Hash {
  static create(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }

  static compare(input: string, hash: string): boolean {
    return this.create(input) === hash;
  }
}

import { User as PrismaUser } from '@prisma/client';

export class User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  created_at: Date;

  constructor(input: PrismaUser) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.created_at = input.created_at;
  }

  get meDetails() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

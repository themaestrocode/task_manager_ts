import { CreateUserData, UserShape } from "../types/user.types";

export class User implements UserShape {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateUserData) {
    this.id = crypto.randomUUID();
    this.name = data.name;
    this.email = data.email;
    this.createdAt = new Date();
    this.updatedAt = new Date()
  }

  toString(): string {
    return `User: ${this.name} (${this.email})`;
  }
  
}
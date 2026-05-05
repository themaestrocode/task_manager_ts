import { BaseShape } from "./base.types";

export interface UserShape extends BaseShape {
  name: string;
  email: string;
}

export type CreateUserData = Omit<UserShape, "id" | "createdAt" | "updatedAt">;

export type UpdateUserData = Partial<CreateUserData>;
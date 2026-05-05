import { User } from "../models/User";
import { CreateUserData, UpdateUserData } from "../types/user.types";
import { BaseService } from "./BaseService";

export class UserService extends BaseService<User> {

  add(data: CreateUserData): User {
    const newUser = new User(data);
    this.items.push(newUser);
    return newUser;
  }

  update(id: string, data: UpdateUserData): User {
      const user = this.findById(id);
      Object.assign(user, data);
      user.updatedAt = new Date();
      return user;
    }

}
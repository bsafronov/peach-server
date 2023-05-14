import { UserModel } from "../models/user";

class UserService {
  async getByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async getByUsername(username: string) {
    return await UserModel.findOne({ username });
  }

  async getById(id: string) {
    return await UserModel.findById(id);
  }
}

export const userService = new UserService();

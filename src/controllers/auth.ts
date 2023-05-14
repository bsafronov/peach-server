import { Request, Response } from "express";
import { userService } from "../services/user";
import { IAuthLogin, IAuthRegister } from "../types/user";
import * as bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import { authService } from "../services/auth";
import { fileService } from "../services/file";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, username, firstName, lastName }: IAuthRegister =
        req.body;
      const picture = req.file;

      const isEmailOccupied = await userService.getByEmail(email);

      if (isEmailOccupied) {
        return res
          .status(401)
          .json({ error: "Пользователь уже зарегистрирован" });
      }

      const isUsernameOccupied = await userService.getByUsername(username);

      if (isUsernameOccupied) {
        return res.status(401).json({ error: "Имя пользователя занято" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        email,
        username,
        firstName,
        lastName,
        password: hashPassword,
      });

      if (picture) {
        const picturePath = await fileService.uploadImage(picture, "avatars");
        user.picturePath = picturePath?.url;
      }

      const token = authService.generateJwtToken(user.id);
      await user.save();

      const response = {
        user,
        token,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(400).json({ error: error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password }: IAuthLogin = req.body;

      const user = await userService.getByEmail(email);

      if (!user) {
        return res.status(400).json({ error: "Пользователь не найден!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Неправильные имя или пароль!" });
      }

      const token = authService.generateJwtToken(user.id);

      const response = {
        user,
        token,
      };

      return res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}

export const authController = new AuthController();

import { Request, Response } from "express";
import { authService } from "../services/auth";

export const checkAuth = (req: Request, res: Response, next: Function) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json({ error: "Не авторизован" });
    }

    const isValid = authService.checkAuth(authorization);
    console.log(isValid);

    if (!isValid) {
      return res.status(401).json({ error: "Неверный токен" });
    }

    next();
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

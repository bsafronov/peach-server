import jwt from "jsonwebtoken";

class AuthService {
  generateJwtToken = (id: string) => {
    return jwt.sign(id, process.env.JWT_SECRET as string);
  };

  checkAuth = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  };
}

export const authService = new AuthService();

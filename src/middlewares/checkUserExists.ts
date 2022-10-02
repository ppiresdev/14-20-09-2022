import { NextFunction, Request, Response } from "express";
import { usersDB } from "../db/users";

class checkUserExists {
  static checkUser(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    if (!userId) {
      return response
        .status(404)
        .json({ error: "O ID do usuário não foi informado" });
    }
    const user = usersDB.find((user) => user.id === userId);

    if (!user) {
      return response.status(404).json({ error: "Usuário não foi encontrado" });
    }

    next();
  }
}

export const checkUserExistsMiddleware = [checkUserExists.checkUser];

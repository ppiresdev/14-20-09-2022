import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetUserIdController {
  getById(request: Request, response: Response) {
    const id = request.params.id;
    const user = usersDB.find((user) => user.id === id);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    return response.json(user.toJsonWithTransaction());
  }
}

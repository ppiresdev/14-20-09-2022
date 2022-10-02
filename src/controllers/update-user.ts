import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class UpdateUserController {
  update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, age, cpf, email } = request.body;

    const user = usersDB.find((user) => user.id === id);

    if (!user) {
      return response.status(404).json({ error: "User não encontrado" });
    }

    try {
      user.updateUser(name, age, cpf, email);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(user);
  }
}

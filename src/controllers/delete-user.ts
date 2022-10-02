import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class DeleteUserController {
  remove(request: Request, response: Response) {
    const { id } = request.params;
    const indexUser = usersDB.findIndex((user) => user.id === id);

    if (indexUser < 0) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    usersDB.splice(indexUser, 1);
    // usersDB = usersDB.filter((user) => user.id !== id);
    return response.status(200).json();
  }
}

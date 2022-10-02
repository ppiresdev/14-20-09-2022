import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Transaction } from "../models/transaction";

export class AddTransactionController {
  addTransaction(request: Request, response: Response) {
    const { userId } = request.params;
    const { title, value, type } = request.body;

    const user = usersDB.find((user) => user.id === userId);

    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    try {
      user.addTransaction(new Transaction(title, value, type));
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(user.toJsonWithTransaction());
  }
}

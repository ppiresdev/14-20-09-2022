import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class DeleteTransactionByUserController {
  remove(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersDB.find((user) => user.id === userId);
    if (!user) {
      return response.status(404).json({ error: "User não encontrado" });
    }

    const transactionIndex = user.transactions.findIndex((t) => t.id === id);
    if (transactionIndex < 0) {
      return response.status(404).json({ error: "Transaction não existe" });
    }

    try {
      user.transactions.splice(transactionIndex, 1);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(user.toJsonWithTransaction());
  }
}

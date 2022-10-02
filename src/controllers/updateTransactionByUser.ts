import { Request, Response } from "express";
import { traceDeprecation } from "process";
import { usersDB } from "../db/users";

export class UpdateTransactionByUserController {
  updateTransaction(request: Request, response: Response) {
    const { userId, id } = request.params;

    const { title, value, type } = request.body;

    const user = usersDB.find((user) => user.id === userId);
    if (!user) {
      return response.status(404).json({ error: "User não encontrado" });
    }

    const transaction = user.transactions.find((t) => t.id === id);
    if (!transaction) {
      return response.status(404).json({ error: "Transaction não existe" });
    }

    try {
      transaction.updateTransaction(title, value, type);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(user.toJsonWithTransaction());
  }
}

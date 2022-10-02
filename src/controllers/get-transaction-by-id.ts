import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetTransactionByIdController {
  getById(request: Request, response: Response) {
    const { userId, id } = request.params;
    const user = usersDB.find((user) => user.id === userId);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }
    const transaction = user.transactions.find((t) => t.id === id);

    if (!transaction) {
      return response
        .status(404)
        .json({ message: "Transaction não encontrado" });
    }
    return response.json(transaction.toJson());
  }
}

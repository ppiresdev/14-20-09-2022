import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetTransactionsByUserController {
  getById(request: Request, response: Response) {
    const { userId } = request.params;
    // const {}
    const user = usersDB.find((user) => user.id === userId);
    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }
    let incomesTotal = 0;
    let outcomesTotal = 0;
    let balance = 0;
    if (user.transactions.length) {
      incomesTotal = user.transactions
        .filter((t) => t.type === "income")
        .reduce((soma, income) => soma + income.value, 0);
      outcomesTotal = user.transactions
        .filter((t) => t.type === "outcome")
        .reduce((soma, outcome) => soma + outcome.value, 0);

      balance = incomesTotal - outcomesTotal;
    }

    return response.json({
      transactions: user.getTransactions(),
      balance: {
        income: incomesTotal,
        outcome: outcomesTotal,
        total: balance,
      },
    });
  }
}

import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetAllUsersController {
  getAll(request: Request, response: Response) {
    const data = usersDB.map((user) => {
      // return {
      //   id: user.id,
      //   name: user.name,
      //   cpf: user.cpf,
      //   email: user.email,
      //   age: user.age,
      //   transactions: user.transactions,
      // };
      return user.toJsonWithTransaction();
    });

    return response.json(data);
  }
}

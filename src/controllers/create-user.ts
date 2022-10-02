import { Request, Response } from "express";
import { User } from "../models/user";
import { usersDB } from "../db/users";

export class CreateUserController {
  create(request: Request, response: Response) {
    const { name, cpf, email, age } = request.body;
    const user = new User(name, cpf, email, age);

    usersDB.push(user);

    // return response.json({
    //   id: user.id,
    //   name: user.name,
    //   cpf: user.cpf,
    //   email: user.email,
    //   age: user.age,
    //   transactions: user.transactions,
    // });

    return response.json(user.toJson());
  }
}

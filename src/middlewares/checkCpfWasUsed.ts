import { NextFunction, Request, Response } from "express";
import { usersDB } from "../db/users";

class checkCpfWasUsed {
  static checkCpf(request: Request, response: Response, next: NextFunction) {
    const { cpf } = request.body;

    if (!cpf) {
      return response.status(404).json({ error: "O CPF deve ser informado" });
    }
    const cpfAlreadyExists = usersDB.find((user) => user.cpf === cpf);

    if (cpfAlreadyExists) {
      return response
        .status(404)
        .json({ error: `O cpf ${cpf} já foi utilizado!` });
    }

    next();
  }
}

export const checkCpfWasAlreadyUsed = [checkCpfWasUsed.checkCpf];

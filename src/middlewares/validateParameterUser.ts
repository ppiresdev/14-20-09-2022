import { NextFunction, Request, Response } from "express";

class ValidateParameterUser {
  static validateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { name, cpf, email, age } = request.body;
    if (!name)
      return response.status(400).json({ error: "O campo nome é obrigatório" });
    if (!cpf)
      return response.status(400).json({ error: "O campo cpf é obrigatório" });
    if (!email)
      return response
        .status(400)
        .json({ error: "O campo e-mail é obrigatório" });
    if (!age)
      return response.status(400).json({ error: "O campo age é obrigatório" });
    next();
  }

  static validateSizeUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const nome = request.body.name as string;
    if (nome.length < 3)
      return response
        .status(401)
        .json({ error: "O tamanho do nome não pode ser inferior a três" });
    next();
  }
}

export const createUserMiddlewares = [
  //
  ValidateParameterUser.validateUser,
  ValidateParameterUser.validateSizeUser,
];

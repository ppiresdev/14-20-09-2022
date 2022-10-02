import express, { Request, Response } from "express";
import { AddTransactionController } from "./controllers/add-transaction";
import { CreateUserController } from "./controllers/create-user";
import { DeleteUserController } from "./controllers/delete-user";
import { DeleteTransactionByUserController } from "./controllers/deleteTransactionByUser";
import { GetAllUsersController } from "./controllers/get-all-users";
import { GetTransactionByIdController } from "./controllers/get-transaction-by-id";
import { GetUserIdController } from "./controllers/get-user-id";
import { GetTransactionsByUserController } from "./controllers/get-user-transactions";
import { UpdateUserController } from "./controllers/update-user";
import { UpdateTransactionByUserController } from "./controllers/updateTransactionByUser";
import { checkCpfWasAlreadyUsed } from "./middlewares/checkCpfWasUsed";
import { checkUserExistsMiddleware } from "./middlewares/checkUserExists";
import { createUserMiddlewares } from "./middlewares/validateParameterUser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (request: Request, response: Response) => {
  return response.send("OK");
});

app.get("/users", new GetAllUsersController().getAll);
app.get("/users/:id", new GetUserIdController().getById);
//app.post("/users", new CreateUserController().create);
app.post(
  "/users",
  createUserMiddlewares,
  checkCpfWasAlreadyUsed,
  new CreateUserController().create
);
app.put("/users/:id", new UpdateUserController().update);
app.delete("/users/:id", new DeleteUserController().remove);
app.post(
  "/user/:userId/transactions",
  checkUserExistsMiddleware,
  new AddTransactionController().addTransaction
);
app.get(
  "/user/:userId/transactions/:id",
  checkUserExistsMiddleware,
  new GetTransactionByIdController().getById
);
app.get(
  "/users/:userId/transactions",
  checkUserExistsMiddleware,
  new GetTransactionsByUserController().getById
);

app.put(
  "/users/:userId/transactions/:id",
  checkUserExistsMiddleware,
  new UpdateTransactionByUserController().updateTransaction
);

app.delete(
  "/users/:userId/transactions/:id",
  checkUserExistsMiddleware,
  new DeleteTransactionByUserController().remove
);

app.listen(8080, () => console.log("Servidor iniciado"));

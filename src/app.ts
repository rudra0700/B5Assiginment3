import express, { Request, Response } from "express";
import { Book } from "./app/model/books.model";
import { booksRoutes } from "./app/controller/books.controller";
import { borrowRoutes } from "./app/controller/borrow.controllers";

export const app = express();

app.use(express.json());
app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Library management system",
  });
});

import express, { Request, Response } from "express";
import { Book } from "../model/books.model";

export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, limit = "10" } = req.query;
    console.log(limit);
    const filterOptions: any = {};
    if (filter) {
      filterOptions.genre = filter;
    }

    const data = await Book.find(filterOptions).limit(
      parseInt(limit as string)
    );
    res.status(200).json({
      success: true,
      message: "found all books",
      data,
    });
  } catch (error) {
     res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Found a single book",
      data,
    });
  } catch (error) {
     res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const data = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Updated book successfully",
      data,
    });
  } catch (error) {
     res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data,
    });
  } catch (error) {
     res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

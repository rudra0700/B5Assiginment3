import express, { Request, Response } from "express";
import { Borrow } from "../model/borrow.model";
import { Book } from "../model/books.model";
export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    console.log(quantity);
    const foundBook = await Book.findById(book);
    if (!foundBook) {
      throw new Error("Book not found");
    }
    if (foundBook.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    foundBook.copies -= quantity;
    await foundBook.updateAvailability();

    const data = await Borrow.create({ book, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Borrow a book successfully",
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

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: 1 } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1
        },
      },
    ]);

    res.status(200).json({
        success: true,
        message: "Found borrowed book collection",
        data
    })

  } catch (error) {
     res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

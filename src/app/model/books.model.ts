import { model, Schema } from "mongoose";
import { IBook, IBookDocument } from "../interfaces/book.interfaces";

const bookSchema = new Schema<IBookDocument>({
    title : {type: String, required: true},
     author: { type: String, required: true },
     genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
     },
     isbn: {type: String, required: true, unique: true},
     description: String,
     copies: {type: Number, required: true, min: 0},
     available: {type: Boolean, default: true}
}, {timestamps: true});

bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

export const Book = model("Book", bookSchema);
import { model, Schema, Types } from "mongoose";
import Book from "./book.model.js";

const reviewSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: [true, "user is required"],
      ref: "User",
    },
    book: {
      type: Types.ObjectId,
      required: [true, "book is required"],
      ref: "Book",
    },
    rating: {
      type: Number,
      min: [0, "rating should be in range 0-5"],
      max: [5, "rating should be in range 0-5"],
      required: [true, "rating is required in range 0-5"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.post("save", async function () {
  const book = this.book;
  const result = await Review.aggregate([
    { $match: { book: book } },
    { $group: { _id: "$book", rating: { $avg: "$rating" } } },
  ]);

  const rating = result.length > 0 ? result[0].rating : 0;
  await Book.findByIdAndUpdate(book, { rating });
});

const Review = model("Review", reviewSchema);

export default Review;

import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "thumbnail is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Book = model("Book", bookSchema);
export default Book;

import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import Book from "../models/book.model.js";

const getBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    const data = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(Number(take)).exec();
    const tbooks = await Book.countDocuments();
    const meta = {
      currentPage: page,
      hasMore: skip + take < tbooks,
    };

    res.status(200).send(new APIResponse(200, data, "books fetch successful", meta));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to fetch books"));
  }
};

const addBook = async (req: Request, res: Response) => {
  try {
    const { title, thumbnail, description, category, author } = req.body;

    const data = await Book.create({ title, thumbnail, description, category, author });

    res.status(200).send(new APIResponse(200, data, "book create successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to create book"));
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await Book.findById(id);

    if (!data) {
      res.status(404).send(new APIResponse(404, data, "book not found"));
      return;
    }

    res.status(200).send(new APIResponse(200, data, "book fetch successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to fetch book"));
  }
};

export { getBooks, addBook, getBook };

import { Request, Response } from "express";
import Review from "../models/review.model.js";
import { APIResponse } from "../utils/APIResponse.js";

const getReviews = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    const data = await Review.find({ book: bookId }).sort({ createdAt: -1 }).exec();
    const treviews = await Review.countDocuments({ book: bookId });
    const meta = {
      currentPage: page,
      hasMore: skip + take < treviews,
    };

    res.status(200).send(new APIResponse(200, data, "reviews fetch successful", meta));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to fetch reviews"));
  }
};

const postReview = async (req: Request, res: Response) => {
  try {
    const book = req.params.id;
    const user = req.user_id;
    const { rating, title, comment } = req.body;

    if (!book) {
      res.status(401).send(new APIResponse(401, null, "book id is required"));
      return;
    }

    if (!rating || !title || !comment) {
      res.status(401).send(new APIResponse(401, null, "rating, title, comment are required"));
      return;
    }

    const data = await Review.create({ user, book, rating, title, comment });

    res.status(200).send(new APIResponse(200, data, "post review successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to post review"));
  }
};

export { getReviews, postReview };

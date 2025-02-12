import { Router } from "express";
import { getBooks, addBook, getBook } from "../controllers/book.controller.js";
import { verifyToken, isAdmin } from "../middleware/authenticate.js";

const router = Router();

router.get("/", getBooks);

router.post("/", verifyToken, isAdmin, addBook);

router.get("/:id", getBook);

export default router;
